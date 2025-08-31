import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

const VideoHomeScreen = ({ navigation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(0);

  const videoStreams = [
    {
      name: 'Mux Test Stream',
      uri: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      description: 'Test stream for dev'
    },
    {
      name: 'Big Buck Bunny',
      uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Animated film'
    },
    {
      name: 'Elephant Dream',
      uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      description: 'Open source movie'
    }
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectVideo = (index) => {
    setSelectedVideo(index);
    setIsDropdownOpen(false);
  };

  const navigateToVideoPlayer = () => {
    navigation.navigate('VideoPlayer', { 
      selectedVideoIndex: selectedVideo,
      videoStreams: videoStreams 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
                 <View style={styles.header}>
           <Ionicons name="videocam" size={50} color="#76d99c" />
                       <Text style={styles.title}>Video Player</Text>
            <Text style={styles.subtitle}>Choose video to watch</Text>
         </View>

                 <View style={styles.selectionContainer}>
           <Text style={styles.sectionTitle}>Select Video</Text>
          
          <TouchableOpacity 
            style={styles.dropdownButton} 
            onPress={toggleDropdown}
            activeOpacity={0.7}
          >
            <Text style={styles.dropdownButtonText}>
              {videoStreams[selectedVideo].name}
            </Text>
                         <Ionicons 
               name={isDropdownOpen ? 'chevron-up' : 'chevron-down'} 
               size={10} 
               color="#040811" 
             />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              {videoStreams.map((stream, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    selectedVideo === index && styles.selectedDropdownItem
                  ]}
                  onPress={() => selectVideo(index)}
                  activeOpacity={0.7}
                >
                  <View style={styles.dropdownItemContent}>
                    <Text style={[
                      styles.dropdownItemText,
                      selectedVideo === index && styles.selectedDropdownItemText
                    ]}>
                      {stream.name}
                    </Text>
                    <Text style={styles.dropdownItemDescription}>
                      {stream.description}
                    </Text>
                  </View>
                                     {selectedVideo === index && (
                     <Ionicons name="checkmark" size={22} color="#040811" />
                   )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

                 <View style={styles.videoInfo}>
           <Text style={styles.infoTitle}>Current Selection:</Text>
           <Text style={styles.infoName}>{videoStreams[selectedVideo].name}</Text>
           <Text style={styles.infoDescription}>{videoStreams[selectedVideo].description}</Text>
         </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Start Watching"
            onPress={navigateToVideoPlayer}
            style={styles.watchButton}
          />
        </View>

                 <View style={styles.featuresContainer}>
           <Text style={styles.featuresTitle}>Player Features:</Text>
           <View style={styles.featureItem}>
             <Ionicons name="play-circle" size={24} color="#76d99c" />
                           <Text style={styles.featureText}>Play/pause ctrl</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="expand" size={24} color="#76d99c" />
              <Text style={styles.featureText}>Fullscreen</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="volume-high" size={24} color="#76d99c" />
              <Text style={styles.featureText}>Volume ctrl</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="time" size={24} color="#76d99c" />
              <Text style={styles.featureText}>Seek bar</Text>
            </View>
         </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040811',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e4e5f3',
    marginTop: 15,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#76d99c',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#e4e5f3',
    marginBottom: 15,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#c6b5a6',
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#76d99c',
    shadowColor: '#040811',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#040811',
    flex: 1,
  },
  dropdownList: {
    backgroundColor: '#c6b5a6',
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#76d99c',
    shadowColor: '#040811',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    maxHeight: height * 0.3,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedDropdownItem: {
    backgroundColor: '#76d99c',
  },
  dropdownItemContent: {
    flex: 1,
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#040811',
    marginBottom: 4,
  },
  selectedDropdownItemText: {
    color: '#040811',
    fontWeight: '700',
  },
  dropdownItemDescription: {
    fontSize: 14,
    color: '#e4e5f3',
  },
  videoInfo: {
    backgroundColor: '#c6b5a6',
    padding: 24,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: '#040811',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#040811',
    marginBottom: 10,
  },
  infoName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e4e5f3',
    marginBottom: 10,
  },
  infoDescription: {
    fontSize: 16,
    color: '#e4e5f3',
    lineHeight: 22,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  watchButton: {
    backgroundColor: '#76d99c',
    paddingVertical: 18,
  },
  featuresContainer: {
    backgroundColor: '#c6b5a6',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#040811',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#040811',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#040811',
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default VideoHomeScreen;
