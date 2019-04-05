import React from 'react';
import './App.css';
import { ReactComponent as Stop } from "./svg_icons/stop.svg"
import { ReactComponent as Play } from "./svg_icons/play.svg"
import { ReactComponent as Pause } from "./svg_icons/pause.svg"
import { ReactComponent as Next } from "./svg_icons/next.svg"
import { ReactComponent as Back } from "./svg_icons/back.svg"
import ReactPlayer from 'react-player'
// import Duration from './Duration';

const songsArray = [{
  id: 1,
  name: "danish2",
  url: "http://www.synope.dk/mp3/vtd/01.mp3"
}
  , {
  id: 2,
  name: "Danish2",
  url: "http://www.synope.dk/mp3/vtd/02.mp3"
}
  , {
  id: 2,
  name: "Danish2",
  url: "http://www.synope.dk/mp3/vtd/03.mp3"
}
  , {
  id: 2,
  name: "Danish2",
  url: "http://www.synope.dk/mp3/vtd/04.mp3"
}
  , {
  id: 2,
  name: "Danish2",
  url: "http://www.synope.dk/mp3/vtd/05.mp3"
}
  , {
  id: 2,
  name: "Danish2",
  url: "http://www.synope.dk/mp3/vtd/02.mp3"
}
]

export class App extends React.Component {

  state = {
    // url: null,
    playing: true,
    volume: 0.8,
    played: 0,
    playackRate: 1.0,
    duration: 0,
    selectedSongIdx: 0
  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  stop = () => {
    this.setState({ url: null, playing: false })
  }

  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  onPlay = () => {
    this.setState({ playing: true })
  }

  onPause = () => {
    this.setState({ playing: false })
  }

  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  onProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  toNextSong = () => {
    console.log('toNextSong')
    this.setState({ selectedSongIdx: this.state.selectedSongIdx + 1 })
  }

  toPreviousSong = (id) => {
    this.setState({ selectedSongIdx: this.state.selectedSongIdx - 1 })
  }

  player = null

  render() {
    const { playing, volume, played, selectedSongIdx } = this.state

    return <div>
      <ReactPlayer
        onProgress={this.onProgress}
        url={songsArray[selectedSongIdx].url}
        playing={playing}
        volume={volume}
        onPlay={this.onPlay}
        onSeek={e => console.log('onSeek', e)}
        className='react-player'
        ref={(el) => this.player = el}
      />
      <div className="btn-volume-container">

        <div id="box-stop-btn"><Stop id="stop" onClick={this.stop}></Stop></div>

        <div className="buttons-box">
          <span id="back-btn"><Back id="back" onClick={() => this.toPreviousSong()} /></span>
          <span id="play-pause-btn" onClick={this.playPause}>{playing ? <Pause id="pause" /> : <Play id="play" />}</span>
          <span id="next-btn"><Next id="next" onClick={() => this.toNextSong()} /></span>
        </div>

        <div>
          <input id="volume" type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />
        </div>
      </div>

      <span id="song-title">title:{songsArray[0].name}</span>

      <div id="box-range">
        <input id="seek"
          type='range' min={0} max={1} step='any'
          value={played}
          onMouseDown={this.onSeekMouseDown}
          onChange={this.onSeekChange}
          onMouseUp={this.onSeekMouseUp}
        />
      </div>

    </div>
  }
}
