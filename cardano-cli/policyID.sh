#!/bin/bash

touch ./blockchain/policy/policy.script && echo "" > ./blockchain/policy/policy.script

# Use the echo command to populate the file ->

echo "{" >> ./blockchain/policy/policy.script 
echo "  \"keyHash\": \"$(cardano-cli address key-hash --payment-verification-key-file ./blockchain/policy/policy.vkey)\"," >> ./blockchain/policy/policy.script 
echo "  \"type\": \"sig\"" >> ./blockchain/policy/policy.script 
echo "}" >> ./blockchain/policy/policy.script

if [ -f "./blockchain/policy/policyID" ]; then
    echo "Deleting file"
    rm "./blockchain/policy/policyID"
    echo "File deleted"
    cardano-cli transaction policyid --script-file ./blockchain/policy/policy.script >> ./blockchain/policy/policyID
else
    cardano-cli transaction policyid --script-file ./blockchain/policy/policy.script >> ./blockchain/policy/policyID
fi