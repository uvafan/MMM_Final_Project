## ----installation, include=FALSE, eval=TRUE--------------------------------------------
for (pkg in c("tidyverse", "magrittr", "lubridate", "knitr", 
              "gt", "devtools", "DiagrammeR", "EpiModel", 
              "parallel", "foreach", "tictoc", "patchwork", "future")) 
  if (!requireNamespace(pkg)) install.packages(pkg)

if (!requireNamespace("gt")) install_github("gt")