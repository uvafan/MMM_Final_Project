import React, {useState, useEffect} from 'react';
import { API_URL } from './constants';
import LineChart from './LineChart';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Slider from '@material-ui/core/Slider';

const containerStyles = makeStyles({
  root: {
    width: '50%',
    display: 'inline-block',
    verticalAlign: "top",
  },
});

const sliderStyles = makeStyles({
  root: {
    width: '90%',
  },
});

const InteractiveSimulator = () => {
  // TODO: Add Tooltip text
  // TODO: Change defaults, step, ranges
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isolationMultiplier, setIsolationMultiplier] = React.useState(1);
  const [contactTracingMultiplier, setContactTracingMultiplier] = React.useState(1);
  const [physicalDistancingMultiplier, setPhysicalDistancingMultiplier] = React.useState(1);
  const [hospitalCapacity, setHospitalCapacity] = React.useState(1);
  const [lockdownDays, setLockdownDays] = React.useState(1);
  const [lockdownStart, setLockdownStart] = React.useState(1);
  const [maskMultiplier, setMaskMultiplier] = React.useState(1);

  const containerClasses = containerStyles();
  const sliderClasses = sliderStyles();

  useEffect(() => {
    setLoading(true);
    const postData = {
      isolationMultiplier, 
      contactTracingMultiplier, 
      physicalDistancingMultiplier, 
      hospitalCapacity, 
      lockdownDays, 
      lockdownStart, 
      maskMultiplier
    }
    fetch(API_URL, {method: 'POST', body: JSON.stringify(postData)})
      .then(res => res.json())
      .then(
        (result) => {
          setLoading(false);
          setJsonData(result);
        },
        (error) => {
          setLoading(false);
          console.log(error);
        },
      )
  }, [
    isolationMultiplier, 
    contactTracingMultiplier, 
    physicalDistancingMultiplier, 
    hospitalCapacity, 
    lockdownDays, 
    lockdownStart, 
    maskMultiplier
  ]);
  
  const sliderProps = {
    className: sliderClasses.root,
    valueLabelDisplay: "auto",
  }

  const SliderTitle = ({label, tooltipText}) => (
    <Tooltip title={tooltipText} placement="top" arrow>
      <Typography variant="h6">
        {label}
      </Typography>
    </Tooltip>
  );
  
  return (
    <>
      <Typography variant="h2">
        Interactive Simulator
      </Typography>
      <Box my={4}>
      <div className={containerClasses.root}>
        <SliderTitle label="Isolation Multiplier" tooltipText="Add" />
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setIsolationMultiplier(newValue);}}
        />
        <SliderTitle label="Hospital Capacity" tooltipText="Add" />
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setHospitalCapacity(newValue);}}
        />
        <SliderTitle label="Lockdown Days" tooltipText="Add" />
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setLockdownDays(newValue);}}
        />
        <SliderTitle label="Lockdown Start" tooltipText="Add" />
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setLockdownStart(newValue);}}
        />
      </div>
      <div className={containerClasses.root}>
        
        <SliderTitle label="Contact Tracing Multiplier" tooltipText="Add" />
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setContactTracingMultiplier(newValue);}}
        />
        <SliderTitle label="Physical Distancing Multiplier" tooltipText="Add" />
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setPhysicalDistancingMultiplier(newValue);}}
        />
        <SliderTitle label="Mask Multiplier" tooltipText="Add" />
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setMaskMultiplier(newValue);}}
        />
      </div>
      </Box>
      {loading ? <LinearProgress /> : <LineChart jsonData={jsonData}/>}
    </>
  );
}

export default InteractiveSimulator;
