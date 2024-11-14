import React, { useEffect, useState } from 'react'

const Table = () => {

    const [data, setData] = useState([])
    const [isAscending, setIsAscending] = useState(true);


    const fetchProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products")
        const data = await response.json()

        console.log("tableData-->", data)
        setData(data)
    }


    const handleSort = () => {
        const sortedData = [...data].sort((a, b) => {
            if (isAscending) {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title)
            }
        })

        setData(sortedData);
        setIsAscending(!isAscending);
    }

    useEffect(() => {
        fetchProducts();
    }, [])


    return (
        <>


            <div className='w-full h-screen flex justify-center items-center '>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[500px] ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 table-fixed">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Sr.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span onClick={handleSort} className="cursor-pointer">
                                        Sort {isAscending ? '↑' : '↓'}
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data.map((value) => {
                                    const { id, title, category, price } = value
                                    return (
                                        <>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={id}>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {id}
                                                </th>
                                                <td scope="row" className="px-6 py-4">
                                                    {title}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {category}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {`$ ${price}`}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default Table
