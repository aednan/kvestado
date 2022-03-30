package com.kvestado.backend.security;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.UUID;

import org.web3j.crypto.ECDSASignature;
import org.web3j.crypto.Hash;
import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;


/**
 * @author Adnan El
 *
 * /// dependency needed
 * https://mvnrepository.com/artifact/org.web3j/core/4.8.7
 * ///
 * checksum validation:
 * Ethereum Address Has Uppercase and Lowercase Letters
 * There are two versions of Ethereum addresses: one that contains uppercase letters and one that does not.
 * The one that is all lowercase is not checksummed
 */
public class ECSignatureVerificationService {

    public void test() throws Exception {
        final String walletAddress = "0x8fb538ecF5e4E813A15a3986ed954fF75C163857";
        final String messageSignature = "0xc97d52f4497177da26a50083161abff6e586e1d5067c19c49e0d3d5f7653f358479e0aae720abd516c37dee0f8dfa6504d7c3e58325b759d44ac622e3f2374121b";
        final String unhashedMessage = "hallo x";
        System.out.println(verifyMessageSignature(walletAddress,messageSignature,unhashedMessage));
    }


    public static boolean verifyMessageSignature(final String walletAddress, final String unhashedMessage , final String messageSignature) throws IOException {
        final byte[] msgHash = hashMessage(unhashedMessage);
        final byte[] signatureBytes = Numeric.hexStringToByteArray(messageSignature);
        byte v = signatureBytes[64];
        if (v < 27) {
            v += 27;
        }

        final Sign.SignatureData signatureData = new Sign.SignatureData(v, Arrays.copyOfRange(signatureBytes, 0, 32), Arrays.copyOfRange(signatureBytes, 32, 64));

        // Iterate for each possible public key to recover
        for (int i = 0; i < 4; i++) {
            final BigInteger publicKey = Sign.recoverFromSignature(
                    i,
                    new ECDSASignature(new BigInteger(1, signatureData.getR()),
                                      new BigInteger(1, signatureData.getS()))
                    , msgHash);
            // To compare wallet address giving against wallet addresses generated. if matches, true will be returned
            if (publicKey != null && walletAddress.equalsIgnoreCase("0x" + Keys.getAddress(publicKey))) {
                return true;
            }
        }
        return false;
    }

    /**
     * https://github.com/ethereum/wiki/wiki/JSON-RPC
     * https://github.com/ethers-io/ethers.js/blob/master/packages/hash/src.ts/message.ts
     */
    public static byte[] hashMessage(String unhashedMessage) throws IOException {
        byte[] prefix = "\u0019Ethereum Signed Message:\n".getBytes(StandardCharsets.UTF_8);
        byte[] message = unhashedMessage.getBytes(StandardCharsets.UTF_8);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        outputStream.write(prefix);
        outputStream.write(Integer.toString(message.length).getBytes(StandardCharsets.UTF_8));
        outputStream.write(message);
        return Hash.sha3(outputStream.toByteArray());
    }


    public static String generateChallengeMessage(){
        return "K" + UUID.randomUUID().toString();
    }

}
