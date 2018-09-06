import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Button } from '../common-components';

import { changeUserPhoto, saveUserPhoto } from '../../actions';

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
  background-color: #ffffff;
  padding: 25px 25px 0 25px;
  overflow: overlay;
  z-index: 1000;
  text-align: center;
  max-height: 600px;
`;

const Image = styled.img`
  width: 200px;
  margin: 0 auto;
`;

const imageInputId = 'userPhoto';

const LoadLabel = styled.div`
  color: #509bfd;
  margin-bottom: 20px;
  cursor: pointer;
`;

class UserPhotoForm extends Component {
  handleRemoveImage = () => {
    const { changeUserPhoto } = this.props;
    changeUserPhoto('');
    document.getElementById(imageInputId).value = '';
  };

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const { changeUserPhoto } = this.props;
    reader.onloadend = () => {
      changeUserPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { newPhoto, saveUserPhoto } = this.props;
    return (
      <Container
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <LoadLabel
          onClick={() => document.getElementById(imageInputId).click()}
        >
          LOAD IMAGE
        </LoadLabel>
        <div>{newPhoto ? <Image alt="" src={newPhoto} /> : <div />}</div>
        <input
          id={imageInputId}
          type="file"
          onChange={e => this.handleImageChange(e)}
          style={{ display: 'none' }}
        />
        <Button onClick={saveUserPhoto}>SAVE IMAGE</Button>
      </Container>
    );
  }
}

export default connect(
  state => ({
    newPhoto: state.authorization.newPhoto
  }),
  {
    changeUserPhoto,
    saveUserPhoto
  }
)(UserPhotoForm);
