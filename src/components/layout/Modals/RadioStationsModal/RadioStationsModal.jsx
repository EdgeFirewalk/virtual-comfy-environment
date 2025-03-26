import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import styles from './RadioStationsModal.module.css';
import { FiPlus, FiX, FiEdit } from 'react-icons/fi';
import Button from '../../../ui/Button/Button';
import DEFAULT_STATIONS from 'd:/project_frontend/virtual-comfy-environment/src/utils/consts/DEFAULT_STATIONS.JS';

const RadioStationsModal = ({
  isOpen,
  onClose,
  onStationSelect,
  setSavedUrls,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [stationName, setStationName] = useState('');
  const [savedUrls, setSavedUrlsLocal] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editUrl, setEditUrl] = useState('');

  useEffect(() => {
    const openedAppOnce = JSON.parse(localStorage.getItem('openedAppOnce'));
    if (!openedAppOnce) {
      localStorage.setItem('savedUrls', JSON.stringify(DEFAULT_STATIONS));
      localStorage.setItem('openedAppOnce', 'true');
    }
    const savedUrlsFromStorage =
      JSON.parse(localStorage.getItem('savedUrls')) || DEFAULT_STATIONS;
    setSavedUrlsLocal(savedUrlsFromStorage);
    setSavedUrls(savedUrlsFromStorage);
  }, [setSavedUrls]);

  useEffect(() => {
    localStorage.setItem('savedUrls', JSON.stringify(savedUrls));
    setSavedUrls(savedUrls);
  }, [savedUrls, setSavedUrls]);

  const getYouTubeVideoId = (url) => {
    const regex = /(?:v=|\/)([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  const handleAddRadioStationClick = () => {
    setIsFormVisible(true);
  };

  const handleSaveUrl = async () => {
    if (youtubeUrl && stationName) {
      const videoId = getYouTubeVideoId(youtubeUrl);
      if (videoId) {
        try {
          const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          const newUrl = {
            id: Date.now(),
            url: youtubeUrl,
            thumbnail,
            title: stationName,
          };
          const updatedUrls = [...savedUrls, newUrl];
          setSavedUrlsLocal(updatedUrls);
          setSavedUrls(updatedUrls);
          setYoutubeUrl('');
          setStationName('');
          setIsFormVisible(false);
        } catch (error) {
          console.error('Ошибка при сохранении ссылки:', error);
          alert('Не удалось сохранить ссылку. Проверьте корректность URL.');
        }
      } else {
        alert('Некорректная ссылка на YouTube');
      }
    } else {
      alert('Пожалуйста, введите ссылку и название радиостанции');
    }
  };

  const deleteUrl = (id) => {
    const newUrls = savedUrls.filter((url) => url.id !== id);
    setSavedUrlsLocal(newUrls);
    setSavedUrls(newUrls);
    if (onStationSelect && newUrls.every((url) => url.id !== id)) {
      onStationSelect(null);
    }
  };

  const startEditing = (id, currentTitle, currentUrl) => {
    setEditingId(id);
    setEditName(currentTitle);
    setEditUrl(currentUrl);
  };

  const saveEdit = (id) => {
    const updatedUrls = savedUrls.map((url) =>
      url.id === id ? { ...url, title: editName, url: editUrl } : url,
    );
    setSavedUrlsLocal(updatedUrls);
    setSavedUrls(updatedUrls);
    setEditingId(null);
  };

  const handleStationClick = (station) => {
    onStationSelect(station);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Available Radio Stations">
      <div className={styles.content}>
        {/* Форма добавления новой станции */}
        {!isFormVisible ? (
          <div
            className={styles.addRadioStation}
            onClick={handleAddRadioStationClick}
          >
            <FiPlus className={styles.addIcon} />
            <span className={styles.addText}>Add New Radio Station</span>
          </div>
        ) : (
          <div className={styles.addRadioStation}>
            <span className={styles.formLabel}>New Station YouTube URL:</span>
            <input
              type="text"
              placeholder="Вставьте ссылку на YouTube"
              className={styles.input}
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
            <span className={styles.formLabel}>New Station Name:</span>
            <input
              type="text"
              placeholder="Введите название радиостанции"
              className={styles.input}
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
            />
            <Button
              className={styles.saveButton}
              text="Add Station"
              onClick={handleSaveUrl}
            />
          </div>
        )}

        {/* Список радиостанций */}
        {savedUrls.map((url) => (
          <div key={url.id}>
            {editingId === url.id ? (
              <div className={styles.editFormWrapper}>
                <div className={styles.addRadioStation}>
                  <span className={styles.formLabel}>Station YouTube URL:</span>
                  <input
                    type="text"
                    placeholder="Вставьте ссылку на YouTube"
                    className={styles.input}
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                  />
                  <span className={styles.formLabel}>Radio Station:</span>
                  <input
                    type="text"
                    placeholder="Введите название радиостанции"
                    className={styles.input}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
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
