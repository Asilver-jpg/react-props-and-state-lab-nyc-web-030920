import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeFilterType = (e) => {
      let filter = e.target.value 
      this.setState({filters:{type: filter} })
  }

  fetchPets = () => {
      let type = this.state.filters.type
      if (type === "all"){
          fetch("/api/pets")
          .then(resp => resp.json())
          .then(data => {this.setState({...this.state, pets: data})})
        }else{
        fetch(`/api/pets?type=${type}`)
        .then(resp => resp.json())
        .then(data => {this.setState({...this.state, pets:data})})
      } 
  }


  onAdoptPet = (event) => {
  
      let pets = this.state.pets
      for(const pet of pets){
        if (pet.id === event.target.dataset.id){
         
          pet.isAdopted = true
          this.setState({data: this.state.data, ...this.state})
          
          return true 
          
        }
      }
      return false
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                 onChangeType={this.changeFilterType}
                 onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                petsData = {this.state.pets}
                onAdoptPet = {this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
