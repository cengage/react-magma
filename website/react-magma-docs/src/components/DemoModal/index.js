import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-magma-dom';

export class DemoModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.buttonRef = React.createRef();

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ isModalOpen: false });

    if (this.buttonRef.current) {
      this.buttonRef.current.focus();
    }
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  render() {
    return (
      <>
        <Button onClick={this.openModal} ref={this.buttonRef}>
          Launch {this.props.size} modal
        </Button>

        <Modal
          header="Demo Modal"
          isOpen={this.state.isModalOpen}
          onClose={this.closeModal}
          size={this.props.size}
        >
          This is a {this.props.size} demo modal.
        </Modal>
      </>
    );
  }
}

DemoModal.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
