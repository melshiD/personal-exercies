The Quantum Divergence Estimated Epoc (QDEE) is a pre-occurance estimate of the time of a particular event.

Each chain has its own properties, the most important to our calculations being the block time.

The QDEE is an estimate of the block height at which quantum computing methods can not produce a
new, longer POW for a given section of chain.  If you were to make a transaction that is posted to, say, block
1,000,000, then the QDEE for your transaction's block would be the block height at which Quantum Computing (QC) can no longer outpace
the network's POW within a single block time.  For example, if QC can produce a 'false' (different from the original) POW that is 1111 blocks long
for a given chain, then the QDEE for our transaction on block 1,000,000 would be block height 1,001,111.  At this point not even
theortical computing methods can un-do what's been posted to the chain.  This is why this relationship is defined as Quantum Divergence.  The transaction
has forever diverged from the possibility of being re-claimed by non-classical computing.