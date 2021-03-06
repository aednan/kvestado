package com.kvestado.backend.service;

import com.kvestado.backend.dao.CampaignRepository;
import com.kvestado.backend.dao.ContributionRepository;
import com.kvestado.backend.dao.PendingTransactionRepository;
import com.kvestado.backend.model.PendingTransaction;
import io.reactivex.Flowable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.annotation.Scope;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Uint;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.http.HttpService;

import java.util.Arrays;
import java.util.HashMap;

@Service
@Scope("singleton")
public class Web3Service {

    @Autowired
    private PendingTransactionRepository pendingTransactionRepository;
    @Autowired
    private CampaignRepository campaignRepository;
    @Autowired
    private ContributionRepository contributionRepository;

//    @Value("${web3.contract.address}")
    private String contractAddress;

    private final Web3j web3Client;
    private HashMap<String,PendingTransaction> pendingTransactions = new HashMap<>();
    private Flowable<Log> web3EventLogsFlowable = null;

// event MyCampaign(address indexed _campaignOwner, uint _campaignId);
// event MyContribution(address indexed _contributor, address indexed _campaignOwner,uint indexed _campaignId, uint amount);
// event SuspendedCampaign(address indexed _campaignOwner, uint indexed _campaignId);
// event RefundedAmount(address indexed _campaignOwner, uint indexed _campaignId,address indexed _contributor, uint amount);
// event Withdrawal(address indexed _campaignOwner, address indexed _campaignBeneficiary, uint _campaignId, uint amount);

    private final String MY_CAMPAIGN =  EventEncoder.encode(
    new Event("MyCampaign", Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Uint>(false) {}))
    );
    private final String MY_CONTRIBUTION =  EventEncoder.encode(
    new Event("MyContribution", Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {},new TypeReference<Address>(true) {}, new TypeReference<Uint>(true) {}, new TypeReference<Uint>(false) {}))
    );
    private final String SUSPENDED_CAMPAIGN =  EventEncoder.encode(
    new Event("SuspendedCampaign", Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Uint>(true) {}))
    );
    private final String REFUNDED_AMOUNT =  EventEncoder.encode(
    new Event("RefundedAmount", Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Uint>(true) {},new TypeReference<Address>(true) {}, new TypeReference<Uint>(false) {} ))
    );
    private final String WITHDRAWAL =  EventEncoder.encode(
    new Event("Withdrawal", Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint>(false) {},new TypeReference<Uint>(false) {}))
    );

    public Web3Service(Environment environment) {
        this.contractAddress = environment.getProperty("web3.contract.address");
        this.web3Client = Web3j.build(new HttpService(environment.getProperty("web3.blockchain.node")));
    }

    @EventListener
    public void startSubscription(ApplicationStartedEvent event){
        try {
        pendingTransactionRepository.findAll().stream().parallel().forEach(pTx -> {
            pendingTransactions.put(pTx.getHash(),pTx);
        });
        getWeb3EventLogsFlowable();
        eventsSubscription();
        } catch (Exception e){}
    }

    public Flowable<Log> getWeb3EventLogsFlowable() {
        if(web3EventLogsFlowable == null){
            // should be edited to start from the last saved block
            EthFilter filter = new EthFilter(DefaultBlockParameterName.EARLIEST,
                    DefaultBlockParameterName.LATEST,
                    contractAddress
            );
            web3EventLogsFlowable = web3Client.ethLogFlowable(filter);
        }
        return web3EventLogsFlowable;
    }

    public void eventUnsubscription() {
        getWeb3EventLogsFlowable().blockingSubscribe();
    }
    public void eventsSubscription () {
           getWeb3EventLogsFlowable()
                   .subscribe(log -> {
            String eventHash = log.getTopics().get(0);

               // TODO: to update the starting block, listOfPending should be empty to select the last transaction block as starting one

          PendingTransaction pendingTransaction = pendingTransactions.get(log.getTransactionHash());

          if(pendingTransaction != null) {
            // MyCampaign Event
              // eventHash == MyCampaign event hash value = first element from topics
            if(eventHash.equalsIgnoreCase(MY_CAMPAIGN)){
                Uint uIntCampaignId = (Uint) FunctionReturnDecoder.decodeIndexedValue(log.getData(), new TypeReference<Uint>() {});
                campaignRepository.updateCampaignValueAndIdValues(true, uIntCampaignId.getValue().longValue(),pendingTransaction.getHash());
                pendingTransactionRepository.delete(pendingTransaction);
            }
            // MyContribution Event
            else if(eventHash.equalsIgnoreCase(MY_CONTRIBUTION)){
                Uint campaignId = (Uint) FunctionReturnDecoder.decodeIndexedValue(log.getTopics().get(3), new TypeReference<Uint>() {});
                contributionRepository.updateValidValue(true, campaignId.getValue().longValue());
                pendingTransactionRepository.delete(pendingTransaction);
            }
            // SuspendedCampaign Event
           else if(eventHash.equalsIgnoreCase(SUSPENDED_CAMPAIGN)){
                System.out.println("Here SUSPENDED_CAMPAIGN");
            }
            // RefundedAmount Event
            else if(eventHash.equalsIgnoreCase(REFUNDED_AMOUNT)){
                System.out.println("Here REFUNDED_AMOUNT");
            }
            // Withdrawal Event
            else if(eventHash.equalsIgnoreCase(WITHDRAWAL)){
                System.out.println("Here WITHDRAWAL");
            }
          }


        }, err -> {err.printStackTrace();});
    }

    public void addAPendingTransaction(PendingTransaction pendingTransaction){
        if(pendingTransaction == null || pendingTransaction.getHash() == null || pendingTransaction.getHash().isBlank()) return;
        pendingTransactionRepository.save(pendingTransaction);
        pendingTransactions.put(pendingTransaction.getHash(),pendingTransaction);
    }


}
