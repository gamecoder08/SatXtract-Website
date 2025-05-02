#Proper README in creation

Code to allocate more space in WSL from storage as V-memory:

```
sudo fallocate -l 32G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

where 16G refers to 16Gigs of storage tranfer as vram. Number can be adjusted as needed. "swapfile" is a file name for this instance. Name changes can be done to create multiple more instances.

Note: This additional allocation is only temporary; and need to be done again after a device restart.
