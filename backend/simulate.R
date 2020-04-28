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

tic()

## ---- echo=FALSE, eval=TRUE, message=FALSE---------------------------------------------
source_files <- c("_icm.mod.init.seiqhrf.R",
                  "_icm.mod.status.seiqhrf.R",
                  "_icm.mod.vital.seiqhrf.R",
                  "_icm.control.seiqhrf.R",
                  "_icm.utils.seiqhrf.R",
                  "_icm.saveout.seiqhrf.R",
                  "_icm.icm.seiqhrf.R")

src_path <- paste0("")

local_source <- TRUE

for (source_file in source_files) {
  if (local_source) {
    source(paste(src_path, source_file, sep=""))
  } else {
    source_gist(gist_url, filename=source_file)
  }
}


## ---- echo=FALSE, eval=TRUE------------------------------------------------------------
# function to set-up and run the baseline simulations

hc_scaler <- 1 # 1 for 10,000 pop, 10 for 100,000 pop, 100 for 1,000,000 pop
baseline_act_rate <- 12

simulate <- function(# control.icm params
                     type = "SEIQHRFPA", 
                     nsteps = 366, 
                     nsims = 1,
                     ncores = 1,
                     prog.rand = FALSE,
                     rec.rand = FALSE,
                     fat.rand = FALSE, # TRUE,
                     quar.rand = FALSE,
                     hosp.rand = FALSE,
                     disch.rand = FALSE,
                     infection.FUN = infection.seiqhrf.icm,
                     recovery.FUN = progress.seiqhrf.icm,
                     departures.FUN = departures.seiqhrf.icm,
                     arrivals.FUN = arrivals.icm,
                     get_prev.FUN = get_prev.seiqhrf.icm,
                     # init.icm params
                     s.num = 996, # 999970
                     e.num= 0,
                     i.num = 4, # 30
                     q.num = 0,
                     h.num = 0,
                     r.num = 0,
                     f.num = 0,
                     p.num = 0,
                     a.num = 0,
                     # param.icm params
                     inf.prob.low = 0.02,
                     inf.prob.high = 0.05,
                     baseline_act_rate = 12,
                     quar.rate = 1/30,
                     hosp.rate = 1/100,
                     disch.rate = 1/20,
                     prog.rate = 1/10,
                     prog.dist.scale = 5,
                     prog.dist.shape = 1.5,
                     rec.rate = 1/20,
                     rec.dist.scale = 35,
                     rec.dist.shape = 1.5,
                     rec.rate.e = 1/10, #NEW Odds each day that an asymptomatic person recovers
                     rec.e.dist.scale = 5, #NEW
                     rec.e.dist.shape = 1.5, #NEW
                     fat.rate.base = 1/40,
                     hosp.cap = 30*hc_scaler, # 4000 replace red ref line too
                     fat.rate.overcap = 1/20,
                     fat.tcoeff = 0.5,
                     vital = TRUE,
                     a.rate = (10.5/365)/1000, 
                     a.prop.e = 0.01,
                     a.prop.i = 0.001,
                     a.prop.q = 0.01,
                     ds.rate = (7/365)/1000, 
                     de.rate = (7/365)/1000, 
                     di.rate = (7/365)/1000,
                     dq.rate = (7/365)/1000,
                     dh.rate = (20/365)/1000,
                     dr.rate = (7/365)/1000,
                     con.agg = 0,
                     con.acc = .07,
                     con.dist.scale = 14,
                     con.dist.shape = 5,
                     prog.a.dist.scale = 5,
                     prog.a.dist.shape = 1.5,
                     rec.a.dist.scale = 5,
                     rec.a.dist.shape = 1.5,
                     out="mean"
                    ) {

  control <- control.icm(type = type, 
                         nsteps = nsteps, 
                         nsims = nsims,
                         ncores = ncores,
                         prog.rand = prog.rand,
                         rec.rand = rec.rand,
                         infection.FUN = infection.FUN,
                         recovery.FUN = recovery.FUN,
                         arrivals.FUN = arrivals.FUN,
                         departures.FUN = departures.FUN,
                         get_prev.FUN = get_prev.FUN)

  init <- init.icm(s.num = s.num,
                   e.num = e.num,
                   i.num = i.num,
                   q.num = q.num,
                   h.num = h.num,
                   r.num = r.num,
                   f.num = f.num,
                   p.num = p.num,
                   a.num = a.num)

  param <-  param.icm(
                      inf.prob.e = inf.prob.low, 
                     act.rate.e = baseline_act_rate, # 10,
                     inf.prob.i = inf.prob.high, 
                     act.rate.i = baseline_act_rate, # 10,
                     inf.prob.q = inf.prob.high,
                     act.rate.q = baseline_act_rate/4,
                     inf.prob.a = inf.prob.low, #NEW
                     act.rate.a = baseline_act_rate/4, #NEW
                     inf.prob.ep = inf.prob.low, 
                     act.rate.ep = baseline_act_rate/2, # 10,
                     inf.prob.ip = inf.prob.high, 
                     act.rate.ip = baseline_act_rate/2, # 10,
                     inf.prob.qp = inf.prob.high, 
                     act.rate.qp = baseline_act_rate/8, 
                     inf.prob.ap = inf.prob.low, #NEW
                     act.rate.ap = baseline_act_rate/8, #NEW
                      quar.rate = quar.rate,
                      hosp.rate = hosp.rate,
                      disch.rate = disch.rate,
                      prog.rate = prog.rate,
                      prog.dist.scale = prog.dist.scale,
                      prog.dist.shape = prog.dist.shape,
                      rec.rate = rec.rate,
                      rec.dist.scale = rec.dist.scale,
                      rec.dist.shape = rec.dist.shape,
                      rec.rate.e = rec.rate.e, #NEW gotta put this here too
                      rec.e.dist.shape = rec.e.dist.shape, #NEW
                      rec.e.dist.scale = rec.e.dist.scale, #NEW
                      fat.rate.base = fat.rate.base,
                      hosp.cap = hosp.cap,
                      fat.rate.overcap = fat.rate.overcap,
                      fat.tcoeff = fat.tcoeff,
                      vital = vital,
                      a.rate = a.rate, 
                      a.prop.e = a.prop.e,
                      a.prop.i = a.prop.i,
                      a.prop.q = a.prop.q,
                      ds.rate = ds.rate, 
                      de.rate = de.rate, 
                      di.rate = di.rate,
                      dq.rate = dq.rate,
                      dh.rate = dh.rate,
                      dr.rate = dr.rate,
                      con.agg = con.agg,
                      con.acc = con.acc,
                      con.dist.scale = con.dist.scale,
                      con.dist.shape = con.dist.shape,
                      prog.a.dist.scale = prog.a.dist.scale,
                      prog.a.dist.shape = prog.a.dist.shape,
                      rec.a.dist.scale = rec.a.dist.scale,
                      rec.a.dist.shape = rec.a.dist.shape
                      )

  sim <- icm.seiqhrf(param, init, control)
  sim_df <- as.data.frame(sim, out=out)

  return(list(sim=sim, df=sim_df))
}


## ---- echo=TRUE, eval=TRUE-------------------------------------------------------------
ramp <- function(t, start, end, start_val, end_val, after_val) {
   ifelse(t <= start, start_val, ifelse(t<=end, start_val + (t-(start+1)) * (end_val-start_val)/(end-start), after_val))
}

lockdown <- function(t, start, end, start_val, lockdown_val, after_rate) {
  ifelse(t<=end, ifelse(t <= start, start_val, lockdown_val), after_rate)
}
# # various contact tracing levels (+isolation)

# starts <- c(7, 17, 37)
# aggressiveness_vals <- c(3,5,10,20)

# for (start in starts){
#   for (aggressiveness in aggressiveness_vals){
#     write_csv(simulate(quar.rate=ramp(1:366, 2, 32, .0333, .3333, .3333), con.agg=ramp(1:366, start, start+20, 0, aggressiveness, aggressiveness))$df, paste('results/trace_',start,'_',aggressiveness,'.csv',sep=''))
#   }
# }

# # various physical distancing strategies (+isolation)

# starts <- c(7, 17, 37)
# after_act_rates <- c(4, 8)

# for (start in starts){
#   for (after_act_rate in after_act_rates){
#     write_csv(simulate(quar.rate=ramp(1:366, 2, 32, .0333, .3333, .3333), baseline_act_rate=ramp(1:366, start, start+20, 12, after_act_rate, after_act_rate))$df, paste('results/distance_',start,'_',after_act_rate,'.csv',sep=''))
#   }
# }

# # Various lockdowns

# starts <- c(7, 17, 37)
# lengths <- c(15, 30, 60)
# after_act_rates <- c(4, 8)

# for (start in starts){
#   for (length in lengths){
#     for (after_act_rate in after_act_rates){
#       write_csv(simulate(quar.rate=ramp(1:366, 2, 32, .0333, .3333, .3333), baseline_act_rate=lockdown(1:366, start, start+length, 12, 2, after_act_rate))$df, paste('results/lockdown_',start,'_',length,'_',after_act_rate,'.csv',sep=''))
#     }
#   }
# }
args = commandArgs(trailingOnly=TRUE)
# ISOLATION
do_isolation <- args[1]
if(do_isolation == 1) {
  isolation_end <- as.numeric(args[2])
  isolation_compliance <- as.numeric(args[3])
  quar_rate <- ramp(1:366, 2, isolation_end, .0333, isolation_compliance, isolation_compliance)
} else {
  quar_rate <- 1/30
}
# PHYS DIST
base_act_rate = 12
do_phys_dist <- args[4]
if(do_phys_dist == 1) {
  start_distancing <- as.numeric(args[5])
  after_act_rate <- as.numeric(args[6])
  base_act_rate <- ramp(1:366, start_distancing, start_distancing+20, 12, after_act_rate, after_act_rate)
} 
# LOCKDOWNS
do_lockdown <- args[7]
if(do_lockdown == 1) {
  start_distancing <- as.numeric(args[8])
  after_act_rate <- as.numeric(args[9])
  length <- as.numeric(args[10])
  base_act_rate <- lockdown(1:366, start_distancing, start_distancing+length, 12, 2, after_act_rate)
} 
# CONTACT TRACING
con_agg <- 0
do_contact_tracing <- args[11]
if(do_contact_tracing == 1) {
  start_tracing <- as.numeric(args[12])
  aggressiveness <- as.numeric(args[13])
  con_agg <- ramp(1:366, start_tracing, start_tracing+20, 0, aggressiveness, aggressiveness)
} 

sim_results <- simulate(quar.rate=quar_rate, baseline_act_rate=base_act_rate, con.agg=con_agg)

## --------------------------------------------------------------------------------------
# print(sim_results$df[366, 'f.num'])
cat(format_csv(sim_results$df))


# ## ---- echo=FALSE, eval=TRUE, message=FALSE, warning=FALSE------------------------------
# baseline_plot_df <- baseline_sim$df %>%
#   # use only the prevalence columns
#   select(time, s.num, e.num, i.num, q.num, 
#          h.num, r.num, f.num, p.num, a.num) %>%
#   pivot_longer(-c(time),
#                names_to="compartment",
#                values_to="count") %>%
#   filter(time <= 250)


# # define a standard set of colours to represent compartments
# compcols <- c("s.num" = "yellow", "e.num" = "orange", "i.num" = "red",
#               "q.num" = "cyan", "h.num" = "magenta", "r.num" = "lightgreen",
#               "f.num" = "black", "p.num" = "blue", "a.num" = "green")
# complabels <- c("s.num" = "Susceptible", "e.num" = "Infected/asymptomatic", 
#                 "i.num" = "Infected/infectious", "q.num" = "Isolated",
#                 "h.num" = "Requires hospitalisation", "r.num" = "Recovered",
#                 "f.num" = "Deaths due to COVID-19", "p.num" = "Isolated, not infected", "a.num" = "Isolated, infected, asymptomatic")

# baseline_plot_df %>%
#   # examine only the first 100 days since it
#   # is all over by then using the default parameters
#   filter(time <= 150) %>%
#   ggplot(aes(x=time, y=count, colour=compartment)) +
#     geom_line(size=2, alpha=0.5) +
#     scale_colour_manual(values = compcols, labels=complabels) +
#     theme_minimal() +
#     labs(title="Baseline simulation",
#          x="Days since beginning of epidemic",
#          y="Prevalence (persons)")


# ## ---- echo=FALSE, eval=TRUE, message=FALSE, warning=FALSE------------------------------
# baseline_plot_df %>%
#   filter(compartment %in% c("e.num","i.num",
#                             "q.num","h.num",
#                             "f.num", "p.num", "a.num")) %>%
# filter(time <= 150) %>%
#   ggplot(aes(x=time, y=count, colour=compartment)) +
#     geom_line(size=2, alpha=0.5) +
#     scale_colour_manual(values = compcols, labels=complabels) +
#     theme_minimal() +
#     labs(title="Baseline simulation",
#          x="Days since beginning of epidemic",
#          y="Prevalence (persons)")


# ## --------------------------------------------------------------------------------------
# # Those who feel symptoms isolate at a higher rate as awareness spreads
# isolation_ramp <- function(t) {
#   ifelse(t <= 2, 0.0333, ifelse(t <= 17, 0.0333 + (t-3)*(0.3333 - 0.03333)/15, 0.3333))
# }

# isolation_awareness <- simulate(quar.rate=isolation_ramp(1:366))
# print(isolation_awareness$df[366,"f.num"])

# ## --------------------------------------------------------------------------------------
# baseline_plot_df <- isolation_awareness$df %>%
#   # use only the prevalence columns
#   select(time, s.num, e.num, i.num, q.num, 
#          h.num, r.num, f.num, p.num, a.num) %>%
#   pivot_longer(-c(time),
#                names_to="compartment",
#                values_to="count") %>%
#   filter(time <= 250)


# # define a standard set of colours to represent compartments
# compcols <- c("s.num" = "yellow", "e.num" = "orange", "i.num" = "red",
#               "q.num" = "cyan", "h.num" = "magenta", "r.num" = "lightgreen",
#               "f.num" = "black", "p.num" = "blue", "a.num" = "green")
# complabels <- c("s.num" = "Susceptible", "e.num" = "Infected/asymptomatic", 
#                 "i.num" = "Infected/infectious", "q.num" = "Isolated",
#                 "h.num" = "Requires hospitalisation", "r.num" = "Recovered",
#                 "f.num" = "Deaths due to COVID-19", "p.num" = "Isolated, not infected", "a.num" = "Isolated, infected, asymptomatic")

# baseline_plot_df %>%
#   # examine only the first 100 days since it
#   # is all over by then using the default parameters
#   filter(time <= 150) %>%
#   ggplot(aes(x=time, y=count, colour=compartment)) +
#     geom_line(size=2, alpha=0.5) +
#     scale_colour_manual(values = compcols, labels=complabels) +
#     theme_minimal() +
#     labs(title="Baseline simulation",
#          x="Days since beginning of epidemic",
#          y="Prevalence (persons)")


# ## --------------------------------------------------------------------------------------
# baseline_plot_df %>%
#   filter(compartment %in% c("e.num","i.num",
#                             "q.num","h.num",
#                             "f.num", "p.num", "a.num")) %>%
# filter(time <= 150) %>%
#   ggplot(aes(x=time, y=count, colour=compartment)) +
#     geom_line(size=2, alpha=0.5) +
#     scale_colour_manual(values = compcols, labels=complabels) +
#     theme_minimal() +
#     labs(title="Baseline simulation",
#          x="Days since beginning of epidemic",
#          y="Prevalence (persons)")


# ## --------------------------------------------------------------------------------------
# # ramp up contact tracing beginning on day 5
# agg_ramp <- function(t) {
#   ifelse(t <= 7, 0, ifelse(t <= 27, (t-8)*10/20, 10))
# }

# tracing <- simulate(quar.rate=isolation_ramp(1:366), con.agg=agg_ramp(1:366))
# print(tracing$df[366,"f.num"])


# ## --------------------------------------------------------------------------------------
# # ramp up physical distancing beginning on day 5 for 50 days
# phys_dist_ramp <- function(t) {
#   ifelse(t<=57, ifelse(t <= 7, 12, ifelse(t <= 27, 12 - (t-8)*8/20, 4)), 12)
# }

# phys_dist <- simulate(quar.rate=isolation_ramp(1:366), baseline_act_rate=phys_dist_ramp(1:366))
# print(phys_dist$df[366,"f.num"])

# ## --------------------------------------------------------------------------------------
# # ramp up physical distancing beginning on day 15 for 50 days
# phys_dist_ramp_15 <- function(t) {
#   ifelse(t<=67, ifelse(t <= 17, 12, ifelse(t <= 37, 12 - (t-18)*8/20, 4)), 12)
# }

# phys_dist_15 <- simulate(quar.rate=isolation_ramp(1:366), baseline_act_rate=phys_dist_ramp_15(1:366))
# print(phys_dist_15$df[366,"f.num"])

# ## --------------------------------------------------------------------------------------
# # Lockdown lasting for 30 days starting at day 15
# lockdown30day <- function(t) {
#   ifelse(t<=47, ifelse(t <= 17, 12, 2), 12)
# }

# lock30day <- simulate(quar.rate=isolation_ramp(1:366), baseline_act_rate=lockdown30day(1:366))
# print(lock30day$df[366,"f.num"])


# ## --------------------------------------------------------------------------------------
# # Lockdown lasting for 30 days starting at day 15
# lockdown30daydist <- function(t) {
#   ifelse(t<=47, ifelse(t <= 17, 12, 2), 4)
# }

# lock30daydist <- simulate(quar.rate=isolation_ramp(1:366), baseline_act_rate=lockdown30daydist(1:366))
# print(lock30daydist$df[366,"f.num"])


# ## --------------------------------------------------------------------------------------
# baseline_plot_df <- lock30daydist$df %>%
#   # use only the prevalence columns
#   select(time, s.num, e.num, i.num, q.num, 
#          h.num, r.num, f.num, p.num, a.num) %>%
#   pivot_longer(-c(time),
#                names_to="compartment",
#                values_to="count") %>%
#   filter(time <= 250)


# # define a standard set of colours to represent compartments
# compcols <- c("s.num" = "yellow", "e.num" = "orange", "i.num" = "red",
#               "q.num" = "cyan", "h.num" = "magenta", "r.num" = "lightgreen",
#               "f.num" = "black", "p.num" = "blue", "a.num" = "green")
# complabels <- c("s.num" = "Susceptible", "e.num" = "Infected/asymptomatic", 
#                 "i.num" = "Infected/infectious", "q.num" = "Isolated",
#                 "h.num" = "Requires hospitalisation", "r.num" = "Recovered",
#                 "f.num" = "Deaths due to COVID-19", "p.num" = "Isolated, not infected", "a.num" = "Isolated, infected, asymptomatic")

# baseline_plot_df %>%
#   # examine only the first 100 days since it
#   # is all over by then using the default parameters
#   filter(time <= 150) %>%
#   ggplot(aes(x=time, y=count, colour=compartment)) +
#     geom_line(size=2, alpha=0.5) +
#     scale_colour_manual(values = compcols, labels=complabels) +
#     theme_minimal() +
#     labs(title="Baseline simulation",
#          x="Days since beginning of epidemic",
#          y="Prevalence (persons)")

# ## --------------------------------------------------------------------------------------
# baseline_plot_df %>%
#   filter(compartment %in% c("e.num","i.num",
#                             "q.num","h.num",
#                             "f.num", "p.num", "a.num")) %>%
# filter(time >= 50 & time <= 100) %>%
#   ggplot(aes(x=time, y=count, colour=compartment)) +
#     geom_line(size=2, alpha=0.5) +
#     scale_colour_manual(values = compcols, labels=complabels) +
#     theme_minimal() +
#     labs(title="Baseline simulation",
#          x="Days since beginning of epidemic",
#          y="Prevalence (persons)")


# ## --------------------------------------------------------------------------------------
# write_csv(simulate()$df, 'results/baseline.csv')


# ramp <- function(t, start, end, start_val, end_val, after_val) {
#   ifelse(t <= start, start_val, ifelse(t<=end, start_val + (t-(start+1)) * (end_val-start_val)/(end-start), after_val))
# }

# # various isolation levels
# ends <- c(17, 32)
# compliance_levels <- c(0.3333, 0.6666)
# for (end in ends){
#   for (comp in compliance_levels){
#     write_csv(simulate(quar.rate=ramp(1:366, 2, end, .0333, comp, comp))$df, paste('results/isolation_',end,'_',comp,'.csv',sep=''))
#   }
# }

# lockdown <- function(t, start, end, start_val, lockdown_val, after_rate) {
#   ifelse(t<=end, ifelse(t <= start, start_val, lockdown_val), after_rate)
# }
# # various contact tracing levels (+isolation)

# starts <- c(7, 17, 37)
# aggressiveness_vals <- c(3,5,10,20)

# for (start in starts){
#   for (aggressiveness in aggressiveness_vals){
#     write_csv(simulate(quar.rate=ramp(1:366, 2, 32, .0333, .3333, .3333), con.agg=ramp(1:366, start, start+20, 0, aggressiveness, aggressiveness))$df, paste('results/trace_',start,'_',aggressiveness,'.csv',sep=''))
#   }
# }

# # various physical distancing strategies (+isolation)

# starts <- c(7, 17, 37)
# after_act_rates <- c(4, 8)

# for (start in starts){
#   for (after_act_rate in after_act_rates){
#     write_csv(simulate(quar.rate=ramp(1:366, 2, 32, .0333, .3333, .3333), baseline_act_rate=ramp(1:366, start, start+20, 12, after_act_rate, after_act_rate))$df, paste('results/distance_',start,'_',after_act_rate,'.csv',sep=''))
#   }
# }

# # Various lockdowns

# starts <- c(7, 17, 37)
# lengths <- c(15, 30, 60)
# after_act_rates <- c(4, 8)

# for (start in starts){
#   for (length in lengths){
#     for (after_act_rate in after_act_rates){
#       write_csv(simulate(quar.rate=ramp(1:366, 2, 32, .0333, .3333, .3333), baseline_act_rate=lockdown(1:366, start, start+length, 12, 2, after_act_rate))$df, paste('results/lockdown_',start,'_',length,'_',after_act_rate,'.csv',sep=''))
#     }
#   }
# }

# # contact tracing + physical distancing (+isolation)
# starts <- c(7, 17)
# aggressiveness_vals <- c(3,5,10,20)
# after_act_rates <- c(4, 8)

# for (start in starts){
#   for (aggressiveness in aggressiveness_vals){
#     for (after_act_rate in after_act_rates){
#       write_csv(simulate(quar.rate=ramp(1:366, 2, 32, .0333, .3333, .3333), baseline_act_rate=ramp(1:366, start, start+20, 12, after_act_rate, after_act_rate), con.agg=ramp(1:366, start, start+20, 0, aggressiveness, aggressiveness))$df, paste('results/trace_and_distance_',start,'_',aggressiveness,'_',after_act_rate,'.csv',sep=''))
#     }
#   }
# }


