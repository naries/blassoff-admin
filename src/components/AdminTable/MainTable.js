import moment from 'moment';
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import './style.css'

export const MainTable = ({
    showSN,
    allProps,
    data,
    loading,
    currentPage,
    pageSize,
    actions,
    selectRows,
    selectedRowsIndex,
    colSpan,
    rowsPerPage,
    noSelect
}) => {
    return (
        <>
            <thead className="thead">
                <tr>
                    {showSN && <th scope="col">S/N</th>}

                    {!noSelect && <th scope="row" style={{ width: 15 }}>
                        <div className="custom-control custom-checkbox pb-0 pd-t-13">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="selectAll"
                                onChange={() => selectRows(data)}
                                checked={data?.filter(x => selectedRowsIndex.some(y => y._id === x._id)).length === data?.length}
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="selectAll"
                            ></label>
                        </div>
                    </th>}

                    {allProps?.map((p, i) => {
                        return <th scope="col" key={i}>{p.name}</th>
                    })}

                    {actions && <th
                        className="text-center"
                        colSpan={2}
                        style={{ minWidth: "55px" }}
                        scope="col"
                    >
                        Actions
                    </th>}
                </tr>
            </thead>
            <tbody>
                {loading ?
                    Array(rowsPerPage).fill(1).map((p, i) => <tr>
                        <td key={i} colSpan={colSpan} className="text-center">
                            <Skeleton height={25} className="m-1" count={pageSize} />
                        </td>
                    </tr>
                    ) : (
                        <>
                            {data && data?.map((d, index) => (
                                <tr key={index}>
                                    {showSN && <th scope="row">
                                        {index + 1 + (currentPage - 1) * pageSize}
                                    </th>}

                                    {!noSelect && <th scope="row" style={{ width: 15 }}>
                                        <div className="custom-control custom-checkbox pb-0 pd-t-13">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id={`check-${d._id}`}
                                                onChange={() => selectRows("", { ...d })}
                                                checked={selectedRowsIndex.filter(r => r._id === d._id).length}
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor={`check-${d._id}`}
                                            ></label>
                                        </div>
                                    </th>}

                                    {allProps?.map((p, i) => {
                                        if (p.type === 'text' || p.type === "longText") {
                                            return <td key={i} className={p.type === "longText" ? "long-text" : ""}>{p.prepend || ""} {d[p?.prop]} {p.append || ""}</td>
                                        }
                                        
                                        if (p.type === 'fn') {
                                            return <td key={i} className="long-text">{p.outputFn(d[p?.prop])}</td>
                                        }

                                        if (p.type === 'boolean') {
                                            return <td key={i}>{p.prepend || ""} {d[p?.prop] ? p?.trueValue : p?.falseValue} {p.append || ""}</td>
                                        }

                                        if (p.type === 'array') {
                                            return <td key={i}>{d[p?.prop]?.map(x => (<div className="p-2">
                                                {x[p.nestName]}
                                            </div>))}</td>
                                        }

                                        if (p.type === "concat") {
                                            if (!p.props) return <td key={i}>{p.nests.map(n => `${d[n] ? d[n] : d[n] === 0 ? "0": ""} `)}</td>
                                            if (p.nests) {
                                                return <td key={i}>{p.nests.map(n => `${d[p?.prop][n] ? d[p?.prop][n] : ""} `)}</td>
                                            }
                                        }

                                        if (p.type === 'date') {
                                            return <td key={i}>{p.prepend || ""} {moment(d[p?.prop]).format("MMM, DD YYYY hh:mm a")} {p.append || ""}</td>
                                        }
                                        if (p.type === 'decorated') {
                                            return <td key={i}>{p.prepend || ""}
                                                <div className={`m-2 decorated ${d[p?.prop] === 'active' ? "decorated--active" : d[p?.prop] === 'suspended' ? "decorated--suspended" : "decorated--pending"}`}>{d[p?.prop]} {p.append || ""}</div>
                                            </td>
                                        }
                                        if (p.type === 'text-decorated') {
                                            return <td key={i}>{p.prepend || ""}
                                                <div className={`m-2 decorated ${d[p?.prop] === 'PUBLIC' || d[p?.prop] === 'PRIVATE' || d[p?.prop] === "LIMITED" ? "decorated--active" : "decorated--suspended"}`}>{d[p?.prop] === 'PUBLIC' || d[p?.prop] === 'PRIVATE' || d[p?.prop] === "LIMITED" ? "LIVE" : d[p?.prop]} {p.append || ""}</div>
                                            </td>
                                        }
                                        if (p.type === 'boolean-decorated') {
                                            return <td key={i}>{p.prepend || ""}
                                                <div className={`decorated ${d[p?.prop] === false ? "decorated--suspended" : "decorated--active"}`}>{
                                                    `${d[p?.prop] === true ? p?.trueValue : p?.falseValue}`
                                                } {p.append || ""}</div>
                                            </td>
                                        }

                                    })}
                                    {actions && <td
                                        className="episode-published text-center"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="dropdown dropleft">
                                            <div type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span style={{ fontWeight: 'bolder' }}>. . .</span>
                                            </div>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                {actions && actions.map((a, i) => {
                                                    if (a.type === "status") {
                                                        return <span className="dropdown-item py-2" key={i} onClick={() => a.fn(d)}>{!d[a.prop] ? a.trueValue : a.falseValue}</span>
                                                    }
                                                    if (a.type === "compare") {
                                                        return <span className="dropdown-item py-2" key={i} onClick={() => a.fn(d)}>{d[a.prop] === d[a?.compareValue] ? a.trueValue : a.falseValue}</span>
                                                    }
                                                    if (a.type === "compare2Values") {
                                                        return <span className="dropdown-item py-2" key={i} onClick={() => a.fn(d)}>{d[a.prop] === a?.compareValue1 ? a.trueValue : d[a.prop] === a?.compareValue2 ? a.falseValue : ""}</span>
                                                    }
                                                    if (a.type === "text") {
                                                        return <span className="dropdown-item py-2" key={i} onClick={() => a.fn(d)}>{a.icon && <span><img className="actionIcon" src={a.icon} alt={a.name} /></span>} {a?.name}</span>
                                                    }
                                                    if (a.type === 'singlePropMultiFunctions') {
                                                        return a?.options.map((p, j) => {
                                                            return p?.show && <span className="dropdown-item py-2" key={j} onClick={() => p.fn(d)}> {p?.value === d[a.prop] ? p?.falseValue : p?.trueValue}</span>
                                                        })
                                                    }
                                                    if (a.type === 'check') {
                                                        return a?.show && <span key={i} className="dropdown-item py-2" onClick={() => a.fn(d)}>{d[a.prop][a.main] ? a?.falseValue : a?.trueValue}</span>
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </td>}
                                </tr>
                            ))}
                        </>
                    )}
            </tbody>


            {/* {confirmActivate && (
                <ConfirmBox
                    showConfirm={confirmActivate}
                    onConfirm={handleActivate}
                    onCancel={() => {
                        loadRadios();
                        showConfirmActivate(false);
                    }}
                    confirmTitle="Activate?"
                    confirmMsg="This will activate the selected Radio. Please confirm"
                    is_request_processing={radioData?.updating}
                />
            )} */}

            {/* {confirmDeactivate && (
                <ConfirmBox
                    showConfirm={confirmDeactivate}
                    onConfirm={handleActivate}
                    onCancel={() => {
                        loadRadios();
                        showConfirmDeactivate(false);
                    }}
                    confirmTitle="Deactivate?"
                    confirmMsg="This will de-activate the selected Radio. Please confirm"
                    is_request_processing={radioData?.updating}
                />
            )} */}

            {/* {showUpdate && (
                <UpdateRadio
                    showEdit={showUpdate}
                    setShowEdit={setShowUpdate}
                    editPayload={selectedRadio}
                    loadRadios={loadRadios}
                />
            )} */}
        </>
    )
}
