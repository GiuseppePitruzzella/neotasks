import React from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { ProgressBar } from "../interfaces/ProgressBarInterface";

const TaskCircle: React.FC<{ data: ProgressBar }> = ({ data }) => {
    return (
        <div className='py-20 flex items-center justify-center space-x-8'>
            <div className='shadow-neo p-8 rounded-2xl rounded-full'>
                <div className='w-64 h-64 shadow-neo rounded-2xl rounded-full'>
                        <CircularProgressbarWithChildren
                            value= {Math.round((data.todoTask / data.totalTask) * 100)}
                            strokeWidth={10}
                            styles={buildStyles({
                                pathColor: '#9CD5EB',
                                trailColor: 'transparent',
                            })}
                        >
                            <CircularProgressbarWithChildren
                            value={Math.round((data.inProgressTask / data.totalTask) * 100)}
                            text={`${data.totalProject} projects`}
                            strokeWidth={10}
                            styles={buildStyles({
                                pathColor: '#B78EE8',
                                textColor: '#585E71',
                                trailColor: 'transparent',
                                textSize: '9px',
                                rotation: (data.todoTask / data.totalTask),
                            })}
                            >                               
                                <CircularProgressbar
                                value= {(data.doneTask / data.totalTask) * 100}
                                strokeWidth={10}
                                styles={buildStyles({
                                    pathColor: '#8C8FE7',
                                    trailColor: 'transparent',
                                    rotation: ((data.todoTask + data.inProgressTask) / data.totalTask) * 100 ,
                                })}
                                />
                            
                            </CircularProgressbarWithChildren>
                        </CircularProgressbarWithChildren>
                </div>
            </div>
        </div>
    );
}

export default TaskCircle;
