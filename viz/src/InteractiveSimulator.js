import React, { useState, useEffect, useCallback } from "react";
import { API_URL } from "./constants";
import LineChart from "./LineChart";
import { styles } from "./styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import Button from '@material-ui/core/Button';

const InteractiveSimulator = () => {
  // TODO: Add Tooltip text
  // TODO: Change defaults, step, ranges
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(false);

  const [isolation, setIsolation] = React.useState(0);
  const [isolationEnd, setIsolationEnd] = React.useState(1);
  const [isolationCompliance, setIsolationCompliance] = React.useState(1);
  const [physDist, setPhysDist] = React.useState(0);
  const [physDistStart, setPhysDistStart] = React.useState(1);
  const [physDistAfterActRate, setPhysDistAfterActRate] = React.useState(1);
  const [lockdown, setLockdown] = React.useState(0);
  const [lockdownStart, setLockdownStart] = React.useState(1);
  const [lockdownAfterActRate, setLockdownAfterActRate] = React.useState(1);
  const [lockdownLength, setLockdownLength] = React.useState(1);
  const [contactTracing, setContactTracing] = React.useState(0);
  const [contactTracingStart, setContactTracingStart] = React.useState(1);
  const [
    contactTracingAggressiveness,
    setContactTracingAggressiveness,
  ] = React.useState(1);

  const classes = styles();

  const updateChart = useCallback(() => {
    setLoading(true);
    const postData = {
      isolation,
      isolationEnd,
      isolationCompliance,
      physDist,
      physDistStart,
      physDistAfterActRate,
      lockdown,
      lockdownStart,
      lockdownAfterActRate,
      lockdownLength,
      contactTracing,
      contactTracingStart,
      contactTracingAggressiveness,
    };
    // console.log(postData)
    fetch(API_URL, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);
          // console.log(result)
          setJsonData(result);
        },
        (error) => {
          setLoading(false);
          console.log(error);
        }
      );
  });

  useEffect(() => {
    updateChart();
  }, []);

  const sliderProps = {
    className: classes.sliderClasses,
    valueLabelDisplay: "auto",
  };

  const SliderTitle = ({ label, tooltipText }) => (
    <Tooltip title={tooltipText} placement="top" arrow>
      <Typography variant="h6">{label}</Typography>
    </Tooltip>
  );

  return (
    <Container maxWidth="md">
      <Typography variant="h2" className={classes.titleClasses}>
        Interactive Simulator
      </Typography>
      <Typography variant="h6" className={classes.subtitleClasses}>
        NOTE: The live verson of this simulator was deprecated May 2020. You can find the codebase <a href="https://github.com/uvafan/MMM_Final_Project">here</a>.
      </Typography>
      <Box my={4}>
        <div className={classes.sliderContainerClasses}>
          <Typography variant="h4">Isolation</Typography>
          <Switch
            checked={isolation === 1}
            color="primary"
            onChange={() => {
              setIsolation(1 - isolation);
            }}
          />
          <SliderTitle
            label="Isolation Compliance"
            tooltipText="Rate of transition to isolation for symptomatic people"
          />
          <Slider
            {...sliderProps}
            disabled={isolation === 0}
            marks
            defaultValue={0.5}
            step={0.1}
            min={0.1}
            max={0.9}
            onChangeCommitted={(event, newValue) => {
              setIsolationCompliance(newValue);
            }}
          />
          <SliderTitle
            label="Days until Full Compliance"
            tooltipText="Ramp-up speed for isolation compliance"
          />
          <Slider
            {...sliderProps}
            disabled={isolation === 0}
            marks
            defaultValue={30}
            step={5}
            min={10}
            max={50}
            onChangeCommitted={(event, newValue) => {
              setIsolationEnd(newValue);
            }}
          />
        </div>

        <div className={classes.sliderContainerClasses}>
          <Typography variant="h4">Lockdown</Typography>
          <Switch
            checked={lockdown === 1}
            color="primary"
            onChange={() => {
              setPhysDist(0);
              setLockdown(1 - lockdown);
            }}
          />
          <SliderTitle
            label="Lockdown Start"
            tooltipText="Number of days until lockdown starts"
          />
          <Slider
            {...sliderProps}
            disabled={lockdown === 0}
            marks
            defaultValue={15}
            step={5}
            min={5}
            max={40}
            onChangeCommitted={(event, newValue) => {
              setLockdownStart(newValue);
            }}
          />
          <SliderTitle
            label="Lockdown Final Act Rate"
            tooltipText="Interactions between people after lockdown"
          />
          <Slider
            {...sliderProps}
            disabled={lockdown === 0}
            marks
            defaultValue={5}
            step={1}
            min={2}
            max={12}
            onChangeCommitted={(event, newValue) => {
              setLockdownAfterActRate(newValue);
            }}
          />
          <SliderTitle
            label="Lockdown Length"
            tooltipText="Number of days from lockdown start until lockdown end"
          />
          <Slider
            {...sliderProps}
            disabled={lockdown === 0}
            marks
            defaultValue={21}
            step={7}
            min={14}
            max={96}
            onChangeCommitted={(event, newValue) => {
              setLockdownLength(newValue);
            }}
          />
        </div>

        <Box my={4} />

        <div className={classes.sliderContainerClasses}>
          <Typography variant="h4">Contact Tracing</Typography>
          <Switch
            checked={contactTracing === 1}
            color="primary"
            onChange={() => {
              setContactTracing(1 - contactTracing);
            }}
          />
          <SliderTitle
            label="Contact Tracing Start"
            tooltipText="Number of days until contact tracing starts"
          />
          <Slider
            {...sliderProps}
            disabled={contactTracing === 0}
            marks
            defaultValue={15}
            step={5}
            min={5}
            max={40}
            onChangeCommitted={(event, newValue) => {
              setContactTracingStart(newValue);
            }}
          />
          <SliderTitle
            label="Contact Tracing Aggressiveness"
            tooltipText="Multiplier for contact tracing branches"
          />
          <Slider
            {...sliderProps}
            disabled={contactTracing === 0}
            marks
            defaultValue={5}
            step={2}
            min={1}
            max={25}
            onChangeCommitted={(event, newValue) => {
              setContactTracingAggressiveness(newValue);
            }}
          />
        </div>

        <div className={classes.sliderContainerClasses}>
          <Typography variant="h4">Physical Distancing</Typography>
          <Switch
            checked={physDist === 1}
            color="primary"
            onChange={() => {
              setLockdown(0);
              setPhysDist(1 - physDist);
            }}
          />
          <SliderTitle
            label="Physical Distancing Start"
            tooltipText="Number of days until physical distancing starts"
          />
          <Slider
            {...sliderProps}
            disabled={physDist === 0}
            marks
            defaultValue={15}
            step={5}
            min={5}
            max={40}
            onChangeCommitted={(event, newValue) => {
              setPhysDistStart(newValue);
            }}
          />
          <SliderTitle
            label="Physical Distancing Final Act Rate"
            tooltipText="Interactions between people after maximum physical distancing"
          />
          <Slider
            {...sliderProps}
            disabled={physDist === 0}
            marks
            defaultValue={5}
            step={1}
            min={2}
            max={12}
            onChangeCommitted={(event, newValue) => {
              setPhysDistAfterActRate(newValue);
            }}
          />
        </div>
      </Box>
      <div className={classes.imageContainerClasses}>
        <Button variant="contained" color="primary" onClick={updateChart}>
          Run simulator
        </Button>
      </div>
      <Box pt={4}/>
      {loading ? <LinearProgress /> : <LineChart jsonData={jsonData} />}
    </Container>
  );
};

export default InteractiveSimulator;
