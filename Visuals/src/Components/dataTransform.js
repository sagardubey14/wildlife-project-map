const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function gunshot(data, filter) {
    let result = [];

    if (filter === 'daily') {
        data.forEach(element => {
            if (element.gunshot === "Yes") {
                result.push({
                    x_axis: element.date,
                    y_axis: (result.find(item => item.x_axis === element.date)?.y_axis || 0) + 1
                });
            }else{
                result.push({
                    x_axis: element.date,
                    y_axis: (result.find(item => item.x_axis === element.date)?.y_axis || 0) + 0
                });
            }
        });
    }

    if (filter === 'weekly') {
        data.forEach(element => {
            if (element.gunshot === "Yes") {
                result.push({
                    x_axis: `Week-${Number(element.week)+1}`, 
                    y_axis: (result.find(item => item.x_axis === element.week)?.y_axis || 0) + 1
                });
            }else{
                result.push({
                    x_axis: `Week-${Number(element.week)+1}`, 
                    y_axis: (result.find(item => item.x_axis === element.week)?.y_axis || 0) + 0
                });
            }
        });
    }

    if (filter === 'monthly') {
        data.forEach(element => {
            const date = new Date(element.date);
            const month = date.getMonth()
            const monthName = monthNames[month];
            if (element.gunshot === "Yes") {
                result.push({
                    x_axis: monthName, 
                    y_axis: (result.find(item => item.x_axis === monthName)?.y_axis || 0) + 1
                });
            }
        });
    }

    return result.reduce((acc, curr) => {
        const existing = acc.find(item => item.x_axis === curr.x_axis);
        if (existing) {
            existing.y_axis += curr.y_axis;
        } else {
            acc.push(curr);
        }
        return acc;
    }, []);
}

export function animalPerGunshot(data){
    let result={};
    data.forEach(element => {
        let selectedAnimal = element.animal==="No"? "Unknown": element.animal;
    
        if (element.gunshot === "Yes") {
          if (result[selectedAnimal]) {
            result[selectedAnimal].Yes += 1;
          } else {
            result[selectedAnimal] = { animal: selectedAnimal, Yes: 1, No: 0 };
          }
        } else {
          if (result[selectedAnimal]) {
            result[selectedAnimal].No += 1;
          } else {
            result[selectedAnimal] = { animal: selectedAnimal, Yes: 0, No: 1 };
          }
        }
    });

    

    return Object.values(result);
}

// export function animalCount(data, filter) {
//     let result = [];

//     if (filter === 'daily') {
//         data.forEach(element => {
//             // Find if animal is already in the result
//             let existingEntry = result.find(item => item.x_axis === element.date);
            
//             if (existingEntry) {
//                 // If the animal is already in the entry, increment its count
//                 if (existingEntry[element.animal]) {
//                     existingEntry[element.animal] += 1;
//                 } else {
//                     existingEntry[element.animal] = 1; // Initialize if the animal is new
//                 }
//             } else {
//                 // If no entry exists for the date, create one
//                 let newEntry = { x_axis: element.date };
//                 newEntry[element.animal] = 1; // Initialize the animal count
//                 result.push(newEntry);
//             }
//         });
//     }

//     if (filter === 'weekly') {
//         data.forEach(element => {
//             const week = `Week-${Number(element.week) + 1}`;
//             let existingEntry = result.find(item => item.x_axis === week);

//             if (existingEntry) {
//                 if (existingEntry[element.animal]) {
//                     existingEntry[element.animal] += 1;
//                 } else {
//                     existingEntry[element.animal] = 1;
//                 }
//             } else {
//                 let newEntry = { x_axis: week };
//                 newEntry[element.animal] = 1;
//                 result.push(newEntry);
//             }
//         });
//     }

//     if (filter === 'monthly') {
//         data.forEach(element => {
//             const date = new Date(element.date);
//             const month = date.getMonth();
//             const monthName = monthNames[month];

//             let existingEntry = result.find(item => item.x_axis === monthName);

//             if (existingEntry) {
//                 if (existingEntry[element.animal]) {
//                     existingEntry[element.animal] += 1;
//                 } else {
//                     existingEntry[element.animal] = 1;
//                 }
//             } else {
//                 let newEntry = { x_axis: monthName };
//                 newEntry[element.animal] = 1;
//                 result.push(newEntry);
//             }
//         });
//     }

//     return result;
// }

export function countAnimal (data){
    let result={};
    data.forEach(element => {
        let selectedAnimal = element.animal==="No"? "Unknown": element.animal;
        if (result[selectedAnimal]) {
            result[selectedAnimal].count += 1;
        } else {
            result[selectedAnimal] = { animal: selectedAnimal, count:1};
        }
    });
    
    delete result["Unknown"];
    
    return Object.values(result);
} 

export function dataSourceCount(data){
    let result={};
    data.forEach(element => {
        let source = element.datasource;
        if (result[source]) {
            result[source].value += 1;
        } else {
            result[source] = { source, value:1};
        }
    });
    return Object.values(result);
}

export function generateAnimalDatasourceSummary(data) {
    const animalSummary = {};

    data.forEach(record => {
        const { animal, datasource } = record;

        if (!animalSummary[animal]) {
        animalSummary[animal] = {};
        }

        if (!animalSummary[animal][datasource]) {
        animalSummary[animal][datasource] = 0;
        }

        animalSummary[animal][datasource]++;
    });

    const result = [];
    for (const animal in animalSummary) {
      const datasourceCounts = { animal };
      for (const datasource in animalSummary[animal]) {
        datasourceCounts[datasource] = animalSummary[animal][datasource];
      }
      result.push(datasourceCounts);
    }
  
    return result;
}
  

export function animalCount(data, filter) {
    let result = [];
    let allAnimals = new Set(); // A set to track all unique animals

    // Collect all unique animals
    data.forEach(element => {
        allAnimals.add(element.animal);
    });

    if (filter === 'daily') {
        data.forEach(element => {
            let existingEntry = result.find(item => item.x_axis === element.date);

            if (existingEntry) {
                // If the animal is already in the entry, increment its count
                if (existingEntry[element.animal]) {
                    existingEntry[element.animal] += 1;
                } else {
                    existingEntry[element.animal] = 1; // Initialize if the animal is new
                }
            } else {
                // If no entry exists for the date, create one
                let newEntry = { x_axis: element.date };
                allAnimals.forEach(animal => {
                    newEntry[animal] = 0; // Initialize all animals with 0 count
                });
                newEntry[element.animal] = 1; // Set the count for the current animal
                result.push(newEntry);
            }
        });
    }

    if (filter === 'weekly') {
        data.forEach(element => {
            const week = `Week-${Number(element.week) + 1}`;
            let existingEntry = result.find(item => item.x_axis === week);

            if (existingEntry) {
                // Increment the animal count
                if (existingEntry[element.animal]) {
                    existingEntry[element.animal] += 1;
                } else {
                    existingEntry[element.animal] = 1;
                }
            } else {
                let newEntry = { x_axis: week };
                allAnimals.forEach(animal => {
                    newEntry[animal] = 0; // Initialize all animals with 0 count
                });
                newEntry[element.animal] = 1; // Set the count for the current animal
                result.push(newEntry);
            }
        });
    }

    if (filter === 'monthly') {
        data.forEach(element => {
            const date = new Date(element.date);
            const month = date.getMonth();
            const monthName = monthNames[month];

            let existingEntry = result.find(item => item.x_axis === monthName);

            if (existingEntry) {
                // Increment the animal count
                if (existingEntry[element.animal]) {
                    existingEntry[element.animal] += 1;
                } else {
                    existingEntry[element.animal] = 1;
                }
            } else {
                let newEntry = { x_axis: monthName };
                allAnimals.forEach(animal => {
                    newEntry[animal] = 0; // Initialize all animals with 0 count
                });
                newEntry[element.animal] = 1; // Set the count for the current animal
                result.push(newEntry);
            }
        });
    }

    return result;
}
