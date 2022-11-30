import React from 'react';

const ConfirmWithModal = ({ title, message, closeModal, modalData, successAction, successActionButton }) => {
    return (
        <div>
            < input type="checkbox" id="confirmation" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={() => successAction(modalData)} htmlFor="confirmation" className="btn">{successActionButton}</label>
                        <button onClick={closeModal} className='btn'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmWithModal;