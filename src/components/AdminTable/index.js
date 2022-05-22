import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { MainTable } from './MainTable';
import Download from '../../assets/svg/download.svg'
import { exportCSV } from '../../helpers/exportCSV';
import moment from 'moment';

let typingTimer;
let displayTypingTimer;

const LONG_TEXT = "longText"
const TEXT = "text"
const TEXT_DECORATED = 'text_decorated'
const DECORATED = 'decorated'
const ARRAY = "array"
const CONCAT = "concat"
const BOOL = 'boolean'
const DATE = 'date'

export const Table = ({
    extraHeaders,
    allProps,
    selector,
    load,
    actions,
    pick,
    dateState,
    disableDownload,
    tableName,
    loading,
    totalCounts,
    isSearchable,
    searchString,
    setSearchString,
    resetDownload,
    noDisplay,
    noSelect,
    manual
}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRowsIndex, setSelectedRowsIndex] = useState([])

    // Number of rows per page
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const _setRowsPerPage = e => {
        setRowsPerPage(e.target.value);
    }

    const getOffSet = () => {
        if (!currentPage) return 0;
        return (currentPage - 1) * rowsPerPage;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page?.selected + 1);
    };

    const pageCount = Math.ceil(totalCounts / rowsPerPage);

    // refactor later
    const selectRows = (x, k = null) => {
        if (k || k === 0) {
            if (selectedRowsIndex.filter(r => r._id === k._id).length) {
                setSelectedRowsIndex(selectedRowsIndex.filter(selection => selection._id !== k._id))
            } else {
                setSelectedRowsIndex([...selectedRowsIndex, k])
            }
            return
        }
        let newX = selectedRowsIndex
        if (x.filter(d => newX.some(y => y._id === d._id)).length === x.length) {
            x.map((data, i) => {
                [data].filter((d, l) => {
                    newX = newX.filter(y => y._id !== d._id);
                })
            })
            setSelectedRowsIndex([...newX])
            return;
        }
        x.map((data, i) => {
            [data].filter((d, l) => {
                newX = newX.filter(y => y._id !== d._id);
            })
            newX.push(data)
        })
        setSelectedRowsIndex([...newX])
    }

    function propName(document, prop) {
        let targetProperty = document[prop.prop];
        let isTypePlainTextOrDecorated = prop.type === TEXT || prop.type === LONG_TEXT || prop.type === TEXT_DECORATED || prop.type === DECORATED
        if (!targetProperty) return;
        if (isTypePlainTextOrDecorated) return targetProperty
        if (prop.type === ARRAY) return targetProperty?.map(x => x[prop.nestName]).toString("")
        if (prop.type === CONCAT) return prop.nests.map(n => targetProperty[n]).join(" ")
        if (prop.type === BOOL) return targetProperty ? 'Yes' : 'No'
        if (prop.type === DATE) return moment(targetProperty).format("MMM, DD YYYY hh:mm a");
    }

    const composeDownload = (documentArray) => {
        if (!documentArray?.length) return;
        let dataToExport = [];
        documentArray.map(doc => {
            let nObj = {};
            allProps.map(prop => {
                nObj[prop.name] = propName(doc, prop)
            })
            dataToExport.push(nObj)
        })
        exportCSV(JSON.stringify(dataToExport), tableName)
    }

    // download

    const downloadAllFromFilter = () => {
        load && load(10000, 0, "download");
    }

    useEffect(() => {
        if (selector?.downloadSuccess) {
            composeDownload(selector?.downloadSlim)
            resetDownload()
        }
    }, [selector?.downloadSuccess])

    const download = () => {
        if (selectedRowsIndex.length) {
            composeDownload(selectedRowsIndex)
            setSelectedRowsIndex([])
            return
        }
        composeDownload(pick)
    }

    useEffect(() => {
        load && load(rowsPerPage, getOffSet(), "normal");
    }, [rowsPerPage, dateState, currentPage])



    return (
        <div className="content">
            <div className="d-flex flex-row flex-wrap justify-content-between">
                <div className="py-4">
                    {!noDisplay && <>
                        <span>Display</span> &nbsp;&nbsp;
                        <input
                            min={5}
                            type="number"
                            style={{ width: 50, padding: 6, borderRadius: 4 }}
                            // value={rowsPerPage}
                            placeholder={5}
                            step={5}
                            onChange={e => {
                                clearTimeout(displayTypingTimer);
                                displayTypingTimer = setTimeout(() => {
                                    _setRowsPerPage(e)
                                }, 2000)
                            }}
                        /> &nbsp;&nbsp;
                    </>}
                    {extraHeaders}
                    {isSearchable && <>
                        <input
                            type="search"
                            className="ml-4"
                            style={{ minWidth: 200, padding: 6, borderRadius: 4 }}
                            placeholder="Search"
                            // value={}
                            onKeyUp={e => {
                                clearTimeout(typingTimer);
                                typingTimer = setTimeout(() => {
                                    console.log(e.target.value)
                                    setSearchString(e.target.value)
                                }, 2000)
                            }}
                        // onKeyDown={e => clearTimeout(typingTimer)}

                        />
                    </>}
                </div>

                {!disableDownload && (
                    // <div>
                    //     <button className="btn btn-light" onClick={download}>
                    //         Download CSV &nbsp;<img src={Download} alt="icon" className="mr-3" /></button>
                    // </div>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={Download} alt="icon" className="mr-3" /> {selector?.downloading ? "Downloading..." : 'Download CSV'} &nbsp;&nbsp;
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" onClick={download}>Selected/ in view</a>
                            <a class="dropdown-item" onClick={downloadAllFromFilter}>All</a>
                        </div>
                    </div>)
                }
                <div style={{ width: "100%", overflow: 'auto' }}>
                    <table className="table-responsiveness dashboard-pod-table table table-striped">
                        <MainTable
                            allProps={allProps}
                            data={manual ? pick && pick?.slice(rowsPerPage * (currentPage - 1) + 1, parseInt(rowsPerPage * (currentPage - 1)) +
                                parseInt(totalCounts < rowsPerPage ? totalCounts : rowsPerPage)) : pick}
                            colSpan={allProps?.length + 2}
                            loading={loading}
                            currentPage={currentPage}
                            rowsPerPage={rowsPerPage}
                            actions={actions}
                            selectRows={selectRows}
                            selectedRowsIndex={selectedRowsIndex}
                            noSelect
                        />
                        {pick?.length > 0 && (
                            <tfoot>
                                <tr>
                                    <td className="pt-3" colSpan={allProps?.length + 2}>
                                        <div className="d-flex justify-content-between">
                                            <div className="showing">
                                                Showing {rowsPerPage * (currentPage - 1) + 1} to{" "}
                                                {parseInt(rowsPerPage * (currentPage - 1)) +
                                                    parseInt(totalCounts < rowsPerPage ? totalCounts : rowsPerPage) < totalCounts ? parseInt(rowsPerPage * (currentPage - 1)) +
                                                parseInt(totalCounts < rowsPerPage ? totalCounts : rowsPerPage) : totalCounts}{" "}
                                                of {totalCounts}&nbsp; entries.
                                            </div>

                                            <ReactPaginate
                                                pageCount={pageCount}
                                                pageRange={2}
                                                marginPagesDisplayed={2}
                                                onPageChange={handlePageChange}
                                                containerClassName="paginate"
                                                previousLabel={"<"}
                                                nextLabel={">"}
                                                disabledClassName={"paginate__link--disabled"}
                                                activeClassName={"paginate__link--active"}
                                                nextLinkClassName="paginate__end-link"
                                                previousLinkClassName="paginate__end-link"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                    {!loading && (!pick || pick?.length) === 0 && (
                        <div className="d-flex justify-content-center m-2">No Record</div>
                    )}
                </div>
            </div>
        </div>
    )
}
