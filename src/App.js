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
  id: 3,
  name: "Danish2",
  url: "http://www.synope.dk/mp3/vtd/03.mp3"
}
  , {
  id: 4,
  name: "Danish2",
  url: "http://www.synope.dk/mp3/vtd/04.mp3"
}
  , {
  id: 5,
  name: "Danish2",
  url: "http://www.synope.dk/mp3/vtd/05.mp3"
}
  , {
  id: 6,
  name: "Danish2",
  url: "http://www.synope.dk/mp3/vtd/02.mp3"
},
{
  id: 7,
  name: "Bedtime Stories",
  url: "http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3"
}, {
  id: 8,
  name: "Despacito",
  url: "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3"
}
]

export class App extends React.Component {

  state = {
    url: null,
    playing: true,
    volume: 1,
    played: 0,
    playackRate: 1.0,
    duration: 0,
    selectedSongIdx: 0,
    loop: false
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
    if (this.state.selectedSongIdx === songsArray.length - 1) {
      this.stop()
      console.log("This was last song")
      return
    }
    console.log('toNextSong')
    this.setState({ selectedSongIdx: this.state.selectedSongIdx + 1 })

  }

  toPreviousSong = () => {
    if (this.state.selectedSongIdx === 0) {
      this.stop()
      console.log("This was first song")
      return
    }
    this.setState({ selectedSongIdx: this.state.selectedSongIdx - 1 })
  }

  randomSong = () => {
    const item = songsArray[Math.floor(Math.random() * songsArray.length)];
    console.log(item)
    this.setState({ selectedSongIdx: item.id - 1 })
  }

  toggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  onEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  // player = null

  render() {
    const { playing, volume, played, selectedSongIdx, loop } = this.state

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
        loop={loop}
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


      <button id="random-btn" onClick={() => this.randomSong()}>play random songs</button>

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

      <div>
        <label htmlFor='loop'>Loop</label>
        <input id='loop' type='checkbox' checked={loop} onChange={this.toggleLoop} />
      </div>
    </div>
  }
}
