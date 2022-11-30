import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import Category from './Category';

const Categories = () => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://jewelry-resale-server.vercel.app/categories');
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section className='bg-base-200 p-6 rounded-lg'>
            <div className=' hidden lg:block'>
                <h1 className='text-[#655D48] text-lg text-center font-semibold'>Here at c2cJewel, we have an impressive range of second-hand jewelry full of high quality pre-owned pieces. Whether you're shopping for yourself or hunting for the perfect present for a loved one, our second-hand collection is sure to have something that catches your eye without hurting your wallet.</h1>
            </div>
            <div className='flex gap-4 justify-center mt-4'>
                {
                    categories.map(category => <Category
                        key={category._id}
                        category={category}
                    ></Category>)
                }
            </div>
        </section>
    );
};

export default Categories;