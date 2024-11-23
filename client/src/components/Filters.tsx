import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

export type FilterOptionsState = {
    id: string;
    label: string;
}

const filterOptions: FilterOptionsState[] = [
    {
        id: "burger",
        label: "Burger"
    },
    {
        id: "pizza",
        label: "Pizza"
    },
    {
        id: "biriyani",
        label: "Biriyani"
    },
    {
        id: "north Indian",
        label: "North Indian"
    },
]

const Filters = () => {
    const appliedFilterHandler = (value: string) => {
    }
    return (
        <div className='md:w-72'>
            <div className='flex items-center justify-between'>
                <h1 className='font-md text-lg text-red'>Filter by cuisines</h1>
                <Button variant={'link'} className='text-burntorange hover:no-underline'>Reset</Button>
            </div>
            {
                filterOptions.map((option: FilterOptionsState) => (
                    <div key={option.id} className='flex items-center space-x-2 my-4'>
                        <Checkbox id={option.id} onClick={() => appliedFilterHandler(option.label)} />
                        <Label className='text-red text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>{option.label}</Label>
                    </div>
                ))
            }
        </div>
    )
}

export default Filters