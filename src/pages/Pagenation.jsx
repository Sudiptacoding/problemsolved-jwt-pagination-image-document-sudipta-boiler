// first of all install and check documention

// npm install react-paginate --save

// diffrent type of class for previous github project

{/* <ReactPaginate
    previousLabel={"previous"}
    nextLabel={"next"}
    breakLabel={"..."}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={3}
    onPageChange={handlePageClick}
    containerClassName={"pagination justify-content-center"}
    pageClassName={"page-item"}
    pageLinkClassName={"page-link"}
    previousClassName={"page-item"}
    previousLinkClassName={"page-link"}
    nextClassName={"page-item"}
    nextLinkClassName={"page-link"}
    breakClassName={"page-item"}
    breakLinkClassName={"page-link"}
    activeClassName={"active"}
/> */}



// Sarver side code 

// app.get('/products', async (req, res) => {
//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);
//     console.log(page, limit)
//     const result = await productCollection.find().skip(page * limit).limit(limit).toArray();
//     res.send(result);
// })


// app.get('/Allproducts', async (req, res) => {
//     const totalCount = await productCollection.countDocuments({})
//     const result = await productCollection.find().toArray();
//     res.send({ totalCount, result });
// })




import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Pagenation = () => {

    const [duplicate, setDuplicate] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [limit, setLimit] = useState(6)

    console.log(duplicate)


    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&limit=${limit}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage, limit]);


    useEffect(() => {
        fetch('http://localhost:5000/Allproducts')
            .then(res => res.json())
            .then(data => {
                setDuplicate(data.result)
                const totalPage = data.totalCount
                const totalPages = Math.ceil(totalPage / limit)
                setPageCount(totalPages)
            })
    }, [limit, currentPage]);


    const handlePageClick = (e) => {
        setCurrentPage(e.selected)
    }

    return (
        <div>
            <div className='contentPage'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageLinkClassName="item"
                    containerClassName="page"
                    activeLinkClassName='active'

                />
                <select name="" value={limit} id="" className='item' onChange={(e) => setLimit(e.target.value)} >
                    <option value="6">6</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default Pagenation;