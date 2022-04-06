import React, { useState, useEffect } from "react";
import { RecordEpisode, DeleteConfirmation } from "../components";
import Record from "../assets/svg/record-black.svg"
import { offlinerecords, } from "../data";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";



export default function Records() {
    const [offlineData, setOffline] = useState(offlinerecords)
    const [createEpisode, setCreateEpisode] = useState(false);
    const [key, setKey] = useState('offline');
    const [deleteId, setDeleteId] = useState();
    const [deleteRec, setDelete] = useState(false);

    useEffect(() => {
        toast.dismiss()
    }, [])

    const deleteRecord = (id) => {
        let remainingRecords;
        remainingRecords = offlineData.filter(data => data.id !== id);
        if (key === "offline") setOffline(remainingRecords);
    }

    return (
        <div>
            <ToastContainer />
            <DeleteConfirmation
                open={deleteRec}
                setOpen={setDelete}
                deleteSelected={deleteRecord}
                id={deleteId}
                setDeleteId={setDeleteId}
            />

            <RecordEpisode
                open={createEpisode}
                setOpen={setCreateEpisode}
                setKey={setKey}
            />

            <div className="p-4">
                <div className="d-flex justify-content-between align-items-center py-4">
                    <span className="page-title">
                        Live/Offline Recordings
                        </span>
                    <Button variant="warning" onClick={() => setCreateEpisode(true)}>
                        <span className="button-label"><img src={Record} alt="record" /> Record Episode</span>
                    </Button>
                </div>

                {/* <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="ml-3"
                >
                    <Tab
                        eventKey="offline"
                        title={
                            <div className="text-center"><img src={RecordRed} alt="icon" className="mr-2" /> Offline Recording</div>
                        }
                    >
                        <div className="py-4 px-3 content">
                            <OfflineRecordTable offlineData={offlineData} setDeleteId={setDeleteId} setDelete={setDelete} />
                        </div>
                    </Tab>
                    <Tab eventKey="live" title={
                        <div className="text-center"><img src={RecordRed} alt="icon" className="mr-2" /> Live Recording</div>
                    }>
                        <div className="py-4 px-3 content">
                            <LiveRecordTable liverecords={liverecords} />
                        </div>
                    </Tab>
                </Tabs> */}
            </div>
        </div>
    )
}