# Backend Server

## Linux Installation
You'll need to install R and run the simulate script once prior to setup to download all the necessary packages.

```
sudo echo "deb http://cran.rstudio.com/bin/linux/ubuntu bionic-cran35/" | sudo tee -a /etc/apt/sources.list
gpg --keyserver keyserver.ubuntu.com --recv-key E298A3A825C0D65DFD57CBB651716619E084DAB9
gpg -a --export E084DAB9 | sudo apt-key add -
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install r-base r-base-dev libcurl4-openssl-dev libssl-dev libxml2-dev python3-venv
sudo Rscript install.R 
sudo apt install python3-pip supervisor nginx
python3 -m venv .env
source .env/bin/activate
pip3 install -r requirements.txt
```

Also do setup steps here: https://medium.com/ymedialabs-innovation/deploy-flask-app-with-nginx-using-gunicorn-and-supervisor-d7a93aa07c18

## Dev

```
python3 server.py
```

## Prod

```
sudo gunicorn3 -w 4 -b 0.0.0.0:80 server:app
```

or

```
/home/ubuntu/MMM_Final_Project/backend/.env/bin/gunicorn -w 4 -b 0.0.0.0:8080 server:app
```
## Connect to AWS instance:

```
ssh -i "MMM-backend.pem" ubuntu@ec2-184-73-33-179.compute-1.amazonaws.com
```