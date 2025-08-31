import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import Slider from '@react-native-community/slider';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

const VideoPlayerScreen = ({ navigation, route }) => {
  const [status, setStatus] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const [screenDimensions, setScreenDimensions] = useState({ width, height });
  const videoRef = useRef(null);

  const videoStreams = route.params?.videoStreams || [
    {
      name: 'Mux Test Stream',
      uri: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
    },
    {
      name: 'Big Buck Bunny',
      uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      name: 'Elephant Dream',
      uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    }
  ];

  useEffect(() => {
    if (route.params?.selectedVideoIndex !== undefined) {
      setCurrentStreamIndex(route.params.selectedVideoIndex);
    }
  }, [route.params?.selectedVideoIndex]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const handlePlayPause = async () => {
    if (status.isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  };

  const handleFullscreen = async () => {
    if (videoRef.current) {
      await videoRef.current.presentFullscreenPlayer();
    }
  };

  const handleMute = async () => {
    if (videoRef.current) {
      await videoRef.current.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = async (value) => {
    if (videoRef.current && status.durationMillis) {
      const newPosition = value * status.durationMillis;
      await videoRef.current.setPositionAsync(newPosition);
    }
  };

  const handleSkip = async (seconds) => {
    if (videoRef.current && status.positionMillis) {
      const newPosition = status.positionMillis + (seconds * 1000);
      await videoRef.current.setPositionAsync(newPosition);
    }
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const formatTime = (milliseconds) => {
    if (!milliseconds) return '0:00';
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const switchStream = (index) => {
    setCurrentStreamIndex(index);
    setStatus({});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <TouchableOpacity style={styles.videoContainer} onPress={toggleControls}>
        <Video
          ref={videoRef}
          style={[styles.video, { width: screenDimensions.width, height: screenDimensions.height * 0.6 }]}
          source={{
            uri: videoStreams[currentStreamIndex].uri,
          }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={setStatus}
          shouldPlay={false}
          isMuted={isMuted}
        />
      </TouchableOpacity>
      
      {showControls && (
        <>
          <View style={[styles.controls, { bottom: screenDimensions.height * 0.15 }]}>
            <TouchableOpacity style={styles.controlButton} onPress={handlePlayPause}>
              <Ionicons
                name={status.isPlaying ? 'pause' : 'play'}
                size={26}
                color="#040811"
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={handleMute}>
              <Ionicons
                name={isMuted ? 'volume-mute' : 'volume-high'}
                size={26}
                color="#040811"
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={() => handleSkip(-10)}>
              <Ionicons name="play-back" size={26} color="#040811" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={() => handleSkip(10)}>
              <Ionicons name="play-forward" size={26} color="#040811" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={handleFullscreen}>
              <Ionicons name="expand" size={26} color="#040811" />
            </TouchableOpacity>
          </View>
          
          {status.durationMillis && (
            <View style={[styles.seekContainer, { bottom: screenDimensions.height * 0.05 }]}>
              <Slider
                style={styles.seekSlider}
                minimumValue={0}
                maximumValue={1}
                value={status.positionMillis ? status.positionMillis / status.durationMillis : 0}
                onSlidingComplete={handleSeek}
                minimumTrackTintColor="#76d99c"
                maximumTrackTintColor="#c6b5a6"
                thumbStyle={{ backgroundColor: '#76d99c' }}
              />
              <Text style={styles.timeText}>
                {formatTime(status.positionMillis)} / {formatTime(status.durationMillis)}
              </Text>
            </View>
          )}
        </>
      )}
      
      {status.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading video stream</Text>
        </View>
      )}
      
      {/* <View style={[styles.navigationContainer, { top: screenDimensions.height * 0.05 }]}>
        <CustomButton
          title="Back to Home"
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: '#FF3B30' }}
        />
      </View> */}
      
      <View style={[styles.streamSelector, { top: screenDimensions.height * 0.05, right: 20 }]}>
        <Text style={styles.streamTitle}>Videos:</Text>
        {videoStreams.map((stream, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.streamButton,
              currentStreamIndex === index && styles.activeStreamButton
            ]}
            onPress={() => switchStream(index)}
          >
            <Text style={[
              styles.streamButtonText,
              currentStreamIndex === index && styles.activeStreamButtonText
            ]}>
              {stream.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040811',
    justifyContent: 'center',
  },
  videoContainer: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  seekContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: 'rgba(198, 181, 166, 0.9)',
    padding: 12,
    borderRadius: 12,
  },
  seekSlider: {
    width: '100%',
    height: 40,
  },
  timeText: {
    color: '#040811',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  controlButton: {
    backgroundColor: 'rgba(198, 181, 166, 0.9)',
    padding: 14,
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#76d99c',
  },
  errorContainer: {
    position: 'absolute',
    top: '50%',
    left: 20,
    right: 20,
    backgroundColor: 'rgba(198, 181, 166, 0.95)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#76d99c',
  },
  errorText: {
    color: '#040811',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigationContainer: {
    position: 'absolute',
    right: 20,
  },
  streamSelector: {
    position: 'absolute',
    backgroundColor: 'rgba(198, 181, 166, 0.95)',
    padding: 16,
    borderRadius: 12,
    maxWidth: 220,
    borderWidth: 2,
    borderColor: '#76d99c',
  },
  streamTitle: {
    color: '#040811',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  streamButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 3,
    borderRadius: 8,
    backgroundColor: 'rgba(118, 217, 156, 0.3)',
  },
  activeStreamButton: {
    backgroundColor: '#76d99c',
  },
  streamButtonText: {
    color: '#040811',
    fontSize: 14,
    fontWeight: '500',
  },
  activeStreamButtonText: {
    fontWeight: 'bold',
    color: '#040811',
  },
});

export default VideoPlayerScreen;
