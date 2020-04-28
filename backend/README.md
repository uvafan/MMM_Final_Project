# Backend Server

## Linux Installation
You'll need to install R and run the simulate script once prior to setup to download all the necessary packages.
```
sudo echo "deb http://cran.rstudio.com/bin/linux/ubuntu bionic-cran35/" | sudo tee -a /etc/apt/sources.list
gpg --keyserver keyserver.ubuntu.com --recv-key E298A3A825C0D65DFD57CBB651716619E084DAB9
gpg -a --export E084DAB9 | sudo apt-key add -
sudo apt-get update
sudo apt-get install r-base r-base-dev
Rscript scripts/simulate.R 
pip3 install -r requirements.txt
python3 server.py
```