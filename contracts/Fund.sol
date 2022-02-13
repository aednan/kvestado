// SPDX-License-Identifier: MIT

pragma solidity 0.8.11;

/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details

import "openzeppelin-solidity/contracts/access/Ownable.sol";

// Reminders
// create an event that notifies the listeners after withdraw or creation of a campaign  
// function that return all compaign belong to an address;
// For gas optimization, the logic for user contracts, or user contribution should be done outside the blockchain by searching campaign or contribution


contract Fund is Ownable{

    constructor() {
        super;
    }
    
    //************ State Variables ************\\

   // To find the campaigns by owner address and the id of the campaign
   mapping(address => mapping(uint => Campaign)) private campaign;
   // To find contribution by Contributor address and id of the campaign 
   mapping(address => mapping(uint => Contribution)) private contribution;
   // campaign id should be returned after the creation of the campaign
   uint private campaignIdCounter = 1; 


   struct Campaign {
        address owner; 
        address beneficiary; // the owner of the compaign can be the same as the beneficiary.
        uint raisedValue;    // 
        string campaignUrl; // official website of the compaign
        bool hasMinimumRaisedValue; // if true withdraw will be allowed if and only if minimum raised reached otherwise refund will be triggered
        uint minimumRaisedValue;  // if hasMinimumRaisedValue is true
        uint expireAfter; // if the date is exceeded the compaign is expired (Unix epoch time)
        State state;
    }
   
    enum State {
        ACTIVE,
        // if date passed and minimumRaisedValue rechead or or the entire raised value is withdrawn
        CLOSED,
       // if policy not respected
        SUSPENDED,
        // if date passed and minimumRaisedValue not rechead
        EXPIRED
    }

    struct Contribution {
        uint amount;
        // in case of refund, the amount should be refunded
        address contributor;
        uint campaignId;
    }
     
     //************ Functions ************\\
     
     function getCampaign(address _campainOwner ,uint _campaignId) view external returns (Campaign memory _campaign){
      return campaign[_campainOwner][_campaignId];
     }

     function getContribution(address _contributor, uint _campaignId) view external returns (Contribution memory _contribution){
      return contribution[_contributor][_campaignId];
     }

     // The withdrawal can be made only by the campaign owner and the amount will be sent to the beneficiary's address
     // ownership checks isn't required, as the campaign is only found using the owner's address
     function withdraw(uint _campaignId) external minValueCheck(campaign[msg.sender][_campaignId]) 
      {

         payable(campaign[msg.sender][_campaignId].beneficiary).transfer(campaign[msg.sender][_campaignId].raisedValue); 

         uint withdrawnAmount = campaign[msg.sender][_campaignId].raisedValue;    

         campaign[msg.sender][_campaignId].raisedValue = 0;
         campaign[msg.sender][_campaignId].state = State.CLOSED;

         emit Withdrawal(msg.sender, campaign[msg.sender][_campaignId].beneficiary, _campaignId, withdrawnAmount);
     }

     
     //
     function addCampaign(address _beneficiary, string calldata _campaignUrl,
                           bool _hasMinimumRaisedValue, uint _minimumRaisedValue, uint _expireAfter) dateCheck(_expireAfter) external{
     
     require(_beneficiary != address(0), "_beneficiary: Beneficiary can't be the zero address");

     campaign[msg.sender][campaignIdCounter]  = Campaign({
             owner: msg.sender
            ,beneficiary: _beneficiary
            ,raisedValue: 0
            ,campaignUrl: _campaignUrl
            ,hasMinimumRaisedValue: _hasMinimumRaisedValue
            ,minimumRaisedValue: _minimumRaisedValue
            ,expireAfter: _expireAfter
            ,state: State.ACTIVE });

       emit MyCampaign(msg.sender, campaignIdCounter++);
     }
      
      // Contribution allowed only for active campaign
      function contribute(address _campaignOwner, uint _campaignId) contributionCheck(campaign[_campaignOwner][_campaignId]) payable external {
              
               
               // Increase campain Balance
               campaign[_campaignOwner][_campaignId].raisedValue += msg.value;
               // Assign contribution
               contribution[msg.sender][_campaignId].amount += msg.value;
               contribution[msg.sender][_campaignId].contributor = msg.sender;
               contribution[msg.sender][_campaignId].campaignId = _campaignId;

          // To update campaign state in case of:
          // if "expireAfter" date passed and minimumRaisedValue not rechead
          Campaign memory _campaign = campaign[_campaignOwner][_campaignId];
          if(_campaign.expireAfter <= block.timestamp 
          && (_campaign.hasMinimumRaisedValue && _campaign.minimumRaisedValue > _campaign.raisedValue ))
                {             
                campaign[_campaignOwner][_campaignId].state = State.EXPIRED;
                }

       emit MyContribution(msg.sender, _campaignOwner, _campaignId, msg.value);
       }

       
       // To allow existing contributors to a campaign to withdraw their contribution.
       // Gas fees are charged for the withdrawal, therefor please check the status of the campaign before calling the function.
       // Withdrawal allowed only if the campaign is in SUSPENDED or EXPIRED state. 
       function refundClaim (address _campaignOwnerAddress ,uint _campaignId) external refundCheck(campaign[_campaignOwnerAddress][_campaignId]) {
       
        // Refund amount to the contributor
        payable(contribution[msg.sender][_campaignId].contributor).transfer(contribution[msg.sender][_campaignId].amount);
        // Reduce transfered amount from raisedValue for the campaign
        campaign[_campaignOwnerAddress][_campaignId].raisedValue -= contribution[msg.sender][_campaignId].amount;
        // Reset contributor amount to 0
        uint refundedAmount = contribution[msg.sender][_campaignId].amount;
        contribution[msg.sender][_campaignId].amount = 0;

        emit RefundedAmount(_campaignOwnerAddress, _campaignId, msg.sender, refundedAmount);
       }

     // Put a campaign in suspend mode in the event of a reported violation,
     // and refund for contributors will be enabled through refundClaim function
     function suspendCampaign(address _campaignOwner, uint _campaignId ) external onlyOwner{
        
        require(campaign[_campaignOwner][_campaignId].state != State.CLOSED,
         "The campaign is already closed, a state change isn't allowed");

        campaign[_campaignOwner][_campaignId].state = State.SUSPENDED;
        emit SuspendedCampaign(_campaignOwner, _campaignId);
     } 
       

        // The Contract should always have an owner
        function renounceOwnership() public override onlyOwner {}


        //************ Events ************\\ 
        event MyCampaign(address indexed _campaignOwner, uint _campaignId);
        event MyContribution(address indexed _contributor, address indexed _campaignOwner,uint indexed _campaignId, uint amount);
        event SuspendedCampaign(address indexed _campaignOwner, uint indexed _campaignId);
        event RefundedAmount(address indexed _campaignOwner, uint indexed _campaignId,address indexed _contributor, uint amount);
        event Withdrawal(address indexed _campaignOwner, address indexed _campaignBeneficiary, uint _campaignId, uint amount);

        //************ Modifiers ************\\

       // Check before withdrawing
    modifier minValueCheck(Campaign memory _campaign) {
         require(_campaign.state == State.ACTIVE && _campaign.owner == msg.sender &&
         ((_campaign.hasMinimumRaisedValue && _campaign.raisedValue >= _campaign.minimumRaisedValue)
         ||!_campaign.hasMinimumRaisedValue)
         , "Minimum raised Value is required and not yet reached or the campaign isn't active, or caller isn't the campaign owner " );
          
         // To run the body of the function from which this modifier is called
         _;
     }

     // check before refund
     modifier refundCheck(Campaign memory _campaign) {
         require(_campaign.state == State.EXPIRED || _campaign.state == State.SUSPENDED 
         , "Value can't be refunded while Campaign isn't in Expired or Suspended state" );
          
         // To run the body of the function from which this modifier is called
         _;
     }

     modifier dateCheck(uint time) {
         require(time >= (block.timestamp + 86400) 
         , "The specified expiration date of the campaign should be at least one day long" );
          
         // To run the body of the function from which this modifier is called
         _;
     }

    modifier contributionCheck(Campaign memory _campaign) {
         
         require(_campaign.expireAfter != 0, "Campaign doesn't exist");
         require(_campaign.state == State.ACTIVE, "Campaign isn't in an active state");
                
         // To run the body of the function from which this modifier is called
         _;

     }

 

}