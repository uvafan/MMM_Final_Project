import React, {useState, useEffect} from 'react';
import { API_URL } from './constants';
import LineChart from './LineChart';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
  const [jsonData, setJsonData] = useState({});
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
          setJsonData(result);
        },
        (error) => {
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
  
  return (
    <>
      <div className={containerClasses.root}>
        <Typography>
          Isolation Multiplier
        </Typography>
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setIsolationMultiplier(newValue);}}
        />
        <Typography>
          Contact Tracing Multiplier
        </Typography>
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setContactTracingMultiplier(newValue);}}
        />
        <Typography>
          Physical Distancing Multiplier
        </Typography>
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setPhysicalDistancingMultiplier(newValue);}}
        />
        <Typography>
          Hospital Capacity
        </Typography>
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setHospitalCapacity(newValue);}}
        />
      </div>
      <div className={containerClasses.root}>
        <Typography>
          Lockdown Days
        </Typography>
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setLockdownDays(newValue);}}
        />
        <Typography>
          Lockdown Start
        </Typography>
        <Slider
          {...sliderProps}
          marks
          defaultValue={5}
          step={1}
          min={1}
          max={10}
          onChangeCommitted={(event, newValue) => {setLockdownStart(newValue);}}
        />
        <Typography>
          Mask Multiplier
        </Typography>
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
      
      <LineChart jsonData={jsonData}/>
    </>
  );
}

export default InteractiveSimulator;
