import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';

const Rating = ({ratings}) => {
    return (
        <>
            {ratings >= 1 ? <span className='text-yellow-500 dark:text-yellow-300'><FaStar /></span>: 
            ratings >= .5 ? <span className='text-yellow-500 dark:text-yellow-300'><FaStarHalfAlt /></span>:
            <span className='text-zinc-700 dark:text-zinc-300'><CiStar /></span>
            }
            {ratings >= 2 ? <span className='text-yellow-500 dark:text-yellow-300'><FaStar /></span>: 
            ratings >= 1.5 ? <span className='text-yellow-500 dark:text-yellow-300'><FaStarHalfAlt /></span>:
            <span className='text-zinc-700 dark:text-zinc-300'><CiStar /></span>
            }
            {ratings >= 3 ? <span className='text-yellow-500 dark:text-yellow-300'><FaStar /></span>: 
            ratings >= 2.5 ? <span className='text-yellow-500 dark:text-yellow-300'><FaStarHalfAlt /></span>:
            <span className='text-zinc-700 dark:text-zinc-300'><CiStar /></span>
            }
            {ratings >= 4 ? <span className='text-yellow-500 dark:text-yellow-300'><FaStar /></span>: 
            ratings >= 3.5 ? <span className='text-yellow-500 dark:text-yellow-300'><FaStarHalfAlt /></span>:
            <span className='text-zinc-700 dark:text-zinc-300'><CiStar /></span>
            }
            {ratings >= 5 ? <span className='text-yellow-500 dark:text-yellow-300'><FaStar /></span>: 
            ratings >= 4.5 ? <span className='text-yellow-500 dark:text-yellow-300'><FaStarHalfAlt /></span>:
            <span className='text-zinc-700 dark:text-zinc-300'><CiStar /></span>
            }
        </>
    );
};

export default Rating;