import React, { useEffect } from 'react'
import { Container, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../../components/AdminTable';
import { getCashoutDetails, getCustomers } from '../../store/customers';

// Props on table
const allProps = [
    {
        name: 'Platform',
        type: 'text',
        prop: 'platformName'
    },
    {
        name: 'Date',
        type: 'date',
        prop: 'requestDate'
    },
    {
        name: 'Status',
        type: 'fn',
        prop: 'status',
        outputFn: (x) => x === 1 ? "Initiated"
            : x === 2 ? "Processed"
                : x === 3 ? "Rejected"
                    : x === 4 ? "Insufficient Funds"
                        : "Unclassified"
    },
    {
        name: 'Amount',
        type: 'text',
        prop: 'amount',
    }
]

export const CashoutModal = ({
    showCashoutModal,
    setShowCashoutModal,
    payload,
    load
}) => {
    const customers = useSelector(getCustomers)
    let { loadingCashouts, fetchCashoutsFailed, fetchCashoutsData } = customers;

    const dispatch = useDispatch();

    useEffect(() => {
        payload && dispatch(getCashoutDetails(payload));
    }, [payload])

    const closeModal = () => {
        setShowCashoutModal(false);
    };


    return (
        <Modal
            show={showCashoutModal}
            onHide={() => {
                closeModal();
            }}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="modal-header" style={{ backgroundColor: '#fff', color: 'Black', fontSize: '24px!important' }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <Container>Customer Cashouts</Container>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='px-4'>
                    <Table
                        noSelect
                        disableDownload
                        noDisplay
                        manual
                        selector={customers}
                        loading={loadingCashouts}
                        allProps={allProps}
                        pick={fetchCashoutsData}
                        tableName="Cashouts Details"
                        totalCounts={fetchCashoutsData?.length}
                    />
                </div>
            </Modal.Body>
        </Modal >
    )
}
