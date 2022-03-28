#!/bin/bash

if [ -f "./blockchain/policy/policyID" ]; then
    rm "./blockchain/policy/policyID"
fi

touch ./blockchain/policy/policy.script && echo "" > ./blockchain/policy/policy.script

# Use the echo command to populate the file ->

echo "{" >> ./blockchain/policy/policy.script 
echo "  \"keyHash\": \"$(cardano-cli address key-hash --payment-verification-key-file ./blockchain/policy/policy.vkey)\"," >> ./blockchain/policy/policy.script 
echo "  \"type\": \"sig\"" >> ./blockchain/policy/policy.script 
echo "}" >> ./blockchain/policy/policy.script

cardano-cli transaction policyid --script-file ./blockchain/policy/policy.script >> ./blockchain/policy/policyID
