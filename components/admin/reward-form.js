import axios from 'axios';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/admin.module.scss';

const BUCKET_URL = 'https://cubacle.s3.us-east-2.amazonaws.com/';

const CreateRewardForm = ({
  selectedReward,
  setSelectedReward,
  setRewards,
}) => {
  const [reward, setReward] = useState(selectedReward);
  const [file, setFile] = useState(null);
  let [imageUrl, setImageUrl] = useState();

  const uploadFile = async () => {
    if (file) {
      let { data } = await axios.post('/api/image-upload', {
        name: file.name,
        type: file.type,
      });

      const url = data.data.data;

      let result = await axios.put(url, file, {
        headers: {
          'Content-type': file.type,
          'Access-Control-Allow-Origin': '*',
        },
      });
      let tempString = file.name;
      let targetString = `https://cubacle.s3.us-east-2.amazonaws.com/${tempString.replace(
        /\s+/g,
        '+'
      )}`;
      setImageUrl(targetString);
      setFile(null);
    }
  };

  const handleFileUpload = (event) => {
    if (event.target.files.length) {
      setFile(event.target.files[0]);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const newReward = { ...reward };
    newReward[name] = value;
    setReward(newReward);
    console.log('Reward form data', reward);
  };

  const handleSubmitReward = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: 'post',
        headers: {},
        url: '/api/rewards-create',
        data: {
          title: reward && reward.title,
          detail: reward && reward.detail,
          imageStr: imageUrl && imageUrl,
          eligibilityCount: reward && reward.eligibilityCount,
        },
      });
      setRewards(null);
      setSelectedReward(null);
      alert('Successfully Created New Reward');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateReward = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: 'post',
        url: '/api/rewards-update',
        data: {
          title: selectedReward && selectedReward.title,
          updatedTitle: reward && reward.title,
          detail: reward && reward.detail,
          imageStr: imageUrl && imageUrl,
          eligibilityCount: reward && reward.eligibilityCount,
        },
      });
      setRewards(null);
      setSelectedReward(null);
      alert('Successfully Updated Reward');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.proposalFormModal}>
      <form
        onSubmit={
          selectedReward.title ? handleUpdateReward : handleSubmitReward
        }
      >
        <header>
          <h4>Create New Proposal</h4>
          <p>Fill the form below to create new proposal</p>
          <button onClick={() => setSelectedReward(null)}>
            <Image
              className={styles.icon}
              src={'/Images/closeIcon2.svg'}
              height={24}
              width={24}
              alt={''}
            />
          </button>
        </header>
        <span>
          <label htmlFor="">Reward Title</label>
          <input
            className="Form-Title"
            type={'text'}
            name={'title'}
            placeholder={'Enter Title...'}
            value={reward && reward.title}
            onChange={handleFormChange}
          />
        </span>

        <span>
          <label htmlFor="">Reward Details</label>
          <input
            className="Form-Details"
            type={'text'}
            name={'detail'}
            placeholder={'Enter Details...'}
            value={reward && reward.detail}
            onChange={handleFormChange}
          />
        </span>

        <span>
          <label htmlFor="">Upload Reward Image</label>
          <input type="file" onChange={handleFileUpload} />
          <button type="button" onClick={uploadFile}>
            
            Upload Reward Image
          </button>
        </span>

        <span>
          <label htmlFor="">Enter Count</label>
          <input
            className="Form-EligibilityCount"
            type={'number'}
            name={'eligibilityCount'}
            placeholder={'Enter Count...'}
            value={reward && reward.eligibilityCount}
            onChange={handleFormChange}
          />
        </span>

        <div className={styles.proposalModalCta}>
          <button id={styles.cancel} onClick={() => setSelectedReward(null)}>
            Cancel
          </button>
          <button id={styles.submit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRewardForm;
