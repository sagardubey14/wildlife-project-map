import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Gunshot from '../Components/Gunshot'
import { animalCount, animalPerGunshot, countAnimal, gunshot } from '../Components/dataTransform';
import GunshotsPerAnimalChart from '../Components/GunshotsPerAnimalChart';
import MovingAnimalChart from '../Components/MovingAnimalChart';
import AnimalSightingsChart from '../Components/AnimalSightingsChart';
import DataSourcePieChart from '../Components/DataSourcePieChart';
import AnimalRadarChart from '../Components/AnimalRadarChart';

function Visuals({data, filter, dataSources, animalRadar}) {
    // console.log(countAnimal(data));
    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
      <Card>
        <Gunshot data={gunshot(data,filter)} />
      </Card>
      <Card>
        <GunshotsPerAnimalChart data={animalPerGunshot(data)}/>
      </Card>

      <Card>
        <MovingAnimalChart data={animalCount(data, filter)}/>
      </Card>
      <Card>
        <AnimalSightingsChart data={countAnimal(data)}/>
      </Card>

      <Card>
        <DataSourcePieChart data={dataSources} />
      </Card>
      <Card>
        <AnimalRadarChart data ={animalRadar}/>
      </Card>
    </div>
  )
}

export default Visuals
