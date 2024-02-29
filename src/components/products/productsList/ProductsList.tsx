import PL_S from '@/components/products/productsList/ProductListStyles.module.scss'
import {ProductCard} from "@/components/products/productsCard/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkAllList, fetchOnePageProduct, getItemsById} from "@/scripts/redux/thunk/requests";
import {currentPage, setFiltered} from "@/scripts/redux/slices/counterSlice";

export const ProductsList: React.FC = () => {
    const list = useSelector((state: any) => state.products.productList)
    const page = useSelector((state: any) => state.counter.value)
    const filter = useSelector((state: any) => state.counter.filter)
    const filterSubmit = useSelector((state: any) => state.counter.onFilterSubmit)
    const isFiltered = useSelector((state: any) => state.counter.isFiltered)
    const listWithCardData = useSelector((state: any) => state.itemsList.itemsList)

    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(checkAllList())
    }, []);

    useEffect(() => {
        // @ts-ignore
        !isFiltered && dispatch(fetchOnePageProduct(page))
    }, [page, filterSubmit]);

    useEffect(()=> {
        // @ts-ignore
        dispatch(fetchOnePageProduct(page, filter))
        dispatch(currentPage())
        // @ts-ignore
        if(!filter.product && !filter.price && !filter.brand){
            dispatch(setFiltered(false))
            // @ts-ignore
            dispatch(checkAllList())
        }
    },[filterSubmit])

    useEffect(() => {
        // @ts-ignore
        dispatch(getItemsById(list))
        // @ts-ignore
    }, [list]);

    return (<>
        <div className={PL_S.List_body}>
            {/*{list && list[0]}*/}
            {listWithCardData && listWithCardData.map((item, index)=>(
                <ProductCard key={index} data={item}/>
            ))}
        </div>
    </>)
}