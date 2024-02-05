// import React from "react";
// import { CircularProgressbar } from "react-circular-progressbar";

// import { ProgressBar } from "../interfaces/ProgressBarInterface";

// const CircularGraph: React.FC<{ data: ProgressBar }> = ({ data }) => {
//     return (
//         <CircularProgressbar value={50} text={`${data.todoTask}%`} />
//         // <div className="">
//         //     <div className="py-20 flex items-center justify-center space-x-8">
//         //         <div className="w-64 h-64 ${buttonColors} shadow-neo w-64 h-64 mb-4 mx-4 rounded-2xl text-[#585E71] hover:shadow-inner-neo rounded-full"></div>
//         //     </div>
//         //     <div className="py-20 flex items-center justify-center space-x-8">
//         //         <div className="w-64 h-64 ${buttonColors} shadow-neo w-64 h-64 mb-4 mx-4 rounded-2xl text-[#585E71] hover:shadow-inner-neo rounded-full"></div>
//         //     </div>
//         // </div>
//     );
// };

// export default CircularGraph;


import React from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { ProgressBar } from "../interfaces/ProgressBarInterface";

const TaskCircle: React.FC<{ data: ProgressBar }> = ({ data }) => {
  const percentage = Math.round((data.todoTask / data.totalTask) * 100);

  // Restituisci il componente del cerchio
  return (
    <div className='py-20 flex items-center justify-center space-x-8'>
        <div className='w-64 h-64 shadow-neo w-64 h-64 mb-4 mx-4 rounded-2xl text-[#E0EAF5] hover:shadow-inner-neo rounded-full'>
                <CircularProgressbarWithChildren
                    value= {50} // {(data.todoTask / data.totalTask) * 100}
                    styles={buildStyles({
                    pathColor: 'red',  // Blue
                    textColor: '#3498db',
                    trailColor: 'transparent',
                    strokeLinecap: 'butt',
                    })}
                >
                    <CircularProgressbarWithChildren
                    value= {20} // {(data.inProgressTask / data.totalTask) * 100}
                    text={`${data.inProgressTask}`}
                    styles={buildStyles({
                        pathColor: 'green',  // Green
                        textColor: '#2ecc71',
                        trailColor: 'transparent',
                        strokeLinecap: 'butt',
                        rotation: 0.5, // (data.todoTask / data.totalTask) * 100 ,
                    })}
                    >                                     
                        <CircularProgressbar
                        value= {10} // {(data.doneTask / data.totalTask) * 100}
                        text={`${data.inProgressTask}`}
                        styles={buildStyles({
                            pathColor: 'purple',  // Green
                            textColor: '#2ecc71',
                            trailColor: 'transparent',
                            strokeLinecap: 'butt',
                            rotation: 0.7 // (data.todoTask + data.inProgressTask / data.totalTask) * 100 ,
                        })}
                        />
                    </CircularProgressbarWithChildren>
                </CircularProgressbarWithChildren>
        </div>
    </div>
  );
}

export default TaskCircle;
