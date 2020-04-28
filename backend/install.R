## ----installation, include=FALSE, eval=TRUE--------------------------------------------
for (pkg in c("tidyverse", "magrittr", "lubridate", "knitr", 
              "gt", "devtools", "DiagrammeR", "EpiModel", 
              "parallel", "foreach", "tictoc", "patchwork", "future")) 
  if (!requireNamespace(pkg)) install.packages(pkg, dependencies=TRUE)

if (!requireNamespace("gt")) install_github("gt")

## ----setup, include=FALSE, eval=TRUE---------------------------------------------------
knitr::opts_chunk$set(echo = FALSE, cache=TRUE,
                      tidy.opts=list(width.cutoff=60),
                      tidy=TRUE)

suppressMessages(library(tidyverse, quietly = T))
suppressMessages(library(patchwork))
suppressMessages(library(magrittr))
suppressMessages(library(lubridate))
suppressMessages(library(knitr))
suppressMessages(library(gt))
suppressMessages(library(tictoc))
suppressMessages(library(EpiModel))
suppressMessages(library(DiagrammeR))
suppressMessages(library(devtools))
suppressMessages(library(parallel))
suppressMessages(library(foreach))