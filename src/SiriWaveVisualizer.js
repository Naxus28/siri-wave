import React from 'react';
import SiriWave from 'siriwave';

// https://github.com/kopiro/siriwave
class SiriWaveVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.siriRef = React.createRef();
  }

  static baseAmplitude = 0.001;
  static maxAmplitude = 3;

  initilizeSiriWave() {
    const wavesContainer = this.siriRef.current;

    this.siriWave = new SiriWave({
      container: wavesContainer,
      width: wavesContainer.getBoundingClientRect().width,
      height: 400,
      style: 'ios9',
      autostart: true,
      amplitude: SiriWaveVisualizer.baseAmplitude,
      speed: .3,
      pixelDepth: .05
    });
  }

  componentDidMount() {
    this.initilizeSiriWave();
  }

  setAmplitude() {
    const { audioData } = this.props;
    let audioLevel = audioData * 1000; // audio comes in very small decimal points
    
    if (audioLevel >= SiriWaveVisualizer.maxAmplitude){
      audioLevel = SiriWaveVisualizer.maxAmplitude;
    } else if (audioLevel <= 2) {
      audioLevel = SiriWaveVisualizer.baseAmplitude;
    }

    this.siriWave.setAmplitude(audioLevel);
  }

  componentDidUpdate(prevProps, prevState) {
    this.setAmplitude();
  }
  
  render() {
    return <div id="siri-waves" ref={this.siriRef}></div>;
  }
}

export default SiriWaveVisualizer;
