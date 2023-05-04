

import { useMemo } from 'react';
import { getHeroesByPublisher } from '../helpers/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    // console.log(heroes);

    return (
        <div className='row rows-cols-1 row-cols-md-3 g-3'>
            {heroes.map((heroe) =>
                <HeroCard key={heroe.id} {...heroe} />
            )}
        </div>
    )
}
