import React, { useState, useEffect, useCallback, useRef } from 'react';
import Modal from '../Modal/Modal';
import styles from './RadioStationsModal.module.css';
import { FiPlus, FiX, FiEdit, FiPlay, FiPause } from 'react-icons/fi';
import Button from '../../../ui/Button/Button';
import TextInput from '../../../ui/InputFields/TextInput/TextInput';
import default_stations from '../../../../utils/consts/default_stations';

const RadioStationsModal = ({
  isOpen,
  onClose,
  onStationSelect,
  setSavedUrls,
  currentPlayingStation,
  isPlaying,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [stationName, setStationName] = useState('');
  const [savedUrls, setSavedUrlsLocal] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [formErrors, setFormErrors] = useState({ url: false, name: false });
  const [editFormErrors, setEditFormErrors] = useState({ url: false, name: false });
  const initialized = useRef(false);

  useEffect(() => {
    if (isOpen && !initialized.current) {
      const savedUrlsFromStorage = JSON.parse(localStorage.getItem('savedUrls')) || default_stations;
      setSavedUrlsLocal(savedUrlsFromStorage);
      setSavedUrls(savedUrlsFromStorage);
      
      const lastPlayed = JSON.parse(localStorage.getItem('lastPlayedStation'));
      if (lastPlayed && savedUrlsFromStorage.some(s => s.id === lastPlayed.id)) {
        requestAnimationFrame(() => {
          onStationSelect(lastPlayed);
        });
      }
      
      initialized.current = true;
    }
  }, [isOpen, setSavedUrls, onStationSelect]);

  useEffect(() => {
    if (initialized.current) {
      localStorage.setItem('savedUrls', JSON.stringify(savedUrls));
    }
  }, [savedUrls]);

  const getYouTubeVideoId = useCallback((url) => {
    const regex = /(?:v=|\/)([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  }, []);

  const validateForm = useCallback(() => {
    const urlValid = !!getYouTubeVideoId(youtubeUrl);
    const nameValid = stationName.trim().length > 0;
    
    setFormErrors({
      url: !urlValid,
      name: !nameValid
    });
    
    return urlValid && nameValid;
  }, [youtubeUrl, stationName, getYouTubeVideoId]);

  const validateEditForm = useCallback(() => {
    const urlValid = !!getYouTubeVideoId(editUrl);
    const nameValid = editName.trim().length > 0;
    
    setEditFormErrors({
      url: !urlValid,
      name: !nameValid
    });
    
    return urlValid && nameValid;
  }, [editUrl, editName, getYouTubeVideoId]);

  const handleStationClick = useCallback((station) => {
    localStorage.setItem('lastPlayedStation', JSON.stringify(station));
    onStationSelect(station);
    onClose();
  }, [onStationSelect, onClose]);

  const handleAddRadioStationClick = () => {
    setIsFormVisible(true);
    setFormErrors({ url: false, name: false });
  };

  const handleSaveUrl = useCallback(async () => {
    if (!validateForm()) return;

    try {
      const videoId = getYouTubeVideoId(youtubeUrl);
      const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      const newStation = {
        id: Date.now(),
        url: youtubeUrl,
        thumbnail,
        title: stationName,
      };
      
      const updatedUrls = [...savedUrls, newStation];
      setSavedUrlsLocal(updatedUrls);
      setSavedUrls(updatedUrls);
      
      setYoutubeUrl('');
      setStationName('');
      setIsFormVisible(false);
      
      handleStationClick(newStation);
    } catch (error) {
      console.error('Save error:', error);
    }
  }, [youtubeUrl, stationName, savedUrls, getYouTubeVideoId, handleStationClick, setSavedUrls, validateForm]);

  const deleteUrl = useCallback((id) => {
    const newUrls = savedUrls.filter((url) => url.id !== id);
    setSavedUrlsLocal(newUrls);
    setSavedUrls(newUrls);
    
    if (currentPlayingStation?.id === id) {
      onStationSelect(null);
      localStorage.removeItem('lastPlayedStation');
    }
  }, [savedUrls, currentPlayingStation, onStationSelect, setSavedUrls]);

  const startEditing = useCallback((id, currentTitle, currentUrl) => {
    setEditingId(id);
    setEditName(currentTitle);
    setEditUrl(currentUrl);
    setEditFormErrors({ url: false, name: false });
  }, []);

  const saveEdit = useCallback((id) => {
    if (!validateEditForm()) return;
  
    try {
      const videoId = getYouTubeVideoId(editUrl);
      const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      
      const updatedUrls = savedUrls.map((url) =>
        url.id === id ? { 
          ...url, 
          title: editName, 
          url: editUrl,
          thumbnail
        } : url
      );
      
      setSavedUrlsLocal(updatedUrls);
      setSavedUrls(updatedUrls);
      setEditingId(null);
      
      if (currentPlayingStation?.id === id) {
        const updatedStation = { 
          ...currentPlayingStation, 
          title: editName, 
          url: editUrl,
          thumbnail
        };
        onStationSelect(updatedStation);
        localStorage.setItem('lastPlayedStation', JSON.stringify(updatedStation));
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  }, [savedUrls, editName, editUrl, currentPlayingStation, onStationSelect, setSavedUrls, validateEditForm, getYouTubeVideoId]);

  // Обработчик нажатия клавиши Enter
  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Available Radio Stations">
      <div className={styles.content}>
        {!isFormVisible ? (
          <div className={styles.addRadioStation} onClick={handleAddRadioStationClick}>
            <FiPlus className={styles.addIcon} />
            <span className={styles.addText}>Add New Radio Station</span>
          </div>
        ) : (
          <div className={styles.addRadioStation}>
            <span className={styles.formLabel}>New Station YouTube URL:</span>
            <TextInput
              placeholder="Paste YouTube URL"
              className={styles.input}
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleSaveUrl)}
              isValid={!formErrors.url}
              onBlur={() => setFormErrors(prev => ({ ...prev, url: !getYouTubeVideoId(youtubeUrl) }))}
            />
            {formErrors.url && <span className={styles.errorText}>Please enter a valid YouTube URL</span>}
            
            <span className={styles.formLabel}>New Station Name:</span>
            <TextInput
              placeholder="Enter station name"
              className={styles.input}
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleSaveUrl)}
              isValid={!formErrors.name}
              onBlur={() => setFormErrors(prev => ({ ...prev, name: stationName.trim().length === 0 }))}
            />
            {formErrors.name && <span className={styles.errorText}>Please enter a station name</span>}
            
            <Button
              className={styles.saveButton}
              text="Add Station"
              onClick={handleSaveUrl}
            />
          </div>
        )}

        {savedUrls.map((url) => (
          <div key={url.id}>
            {editingId === url.id ? (
              <div className={styles.editFormWrapper}>
                <div className={styles.addRadioStation}>
                  <span className={styles.formLabel}>Station YouTube URL:</span>
                  <TextInput
                    placeholder="Paste YouTube URL"
                    className={styles.input}
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, () => saveEdit(url.id))}
                    isValid={!editFormErrors.url}
                    onBlur={() => setEditFormErrors(prev => ({ ...prev, url: !getYouTubeVideoId(editUrl) }))}
                  />
                  {editFormErrors.url && <span className={styles.errorText}>Please enter a valid YouTube URL</span>}
                  
                  <span className={styles.formLabel}>Radio Station:</span>
                  <TextInput
                    placeholder="Enter station name"
                    className={styles.input}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, () => saveEdit(url.id))}
                    isValid={!editFormErrors.name}
                    onBlur={() => setEditFormErrors(prev => ({ ...prev, name: editName.trim().length === 0 }))}
                  />
                  {editFormErrors.name && <span className={styles.errorText}>Please enter a station name</span>}
                  
                  <Button
                    className={styles.saveButton}
                    text="Save"
                    onClick={(e) => {
                      e.stopPropagation();
                      saveEdit(url.id);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.urlItem}>
                <div
                  className={styles.urlItemContent}
                  onClick={() => handleStationClick(url)}
                >
                  <img
                    src={url.thumbnail}
                    alt="YouTube Thumbnail"
                    className={styles.thumbnail}
                  />
                  <div className={styles.videoTitle}>{url.title}</div>
                  {currentPlayingStation?.id === url.id && (
                    <div className={styles.playStatus}>
                      {isPlaying ? <FiPause /> : <FiPlay />}
                    </div>
                  )}
                </div>
                <div className={styles.actions}>
                  <FiEdit
                    className={styles.editIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(url.id, url.title, url.url);
                    }}
                  />
                  <FiX
                    className={styles.deleteIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteUrl(url.id);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default RadioStationsModal;