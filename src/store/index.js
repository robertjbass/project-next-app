import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedProjects: [
      {
          id: "1",
          title: "UberTeleport",
          bgColor: "55",
          fontColor: "fff",
          imageUrl: `https://dummyimage.com/600x400/5cf/000.png&text=UberTeleport`,
          username: "716green",
          description:
            "A teleporter sharing service where the owner of the teleporter beams you to your destination for ratings in the mobile app",
          technologies: [
            "JavaScript",
            "MariaDB",
            "Firebase",
            "Nginx",
            "Cloud Functions",
            "Vue.js",
        ],
          startDate: '2021-01-20',
          endDate: '2021-12-01'
        },
        {
          id: "2",
          title: "TierZooDaily",
          bgColor: "cc87fc",
          fontColor: "000",
          imageUrl:
            "https://dummyimage.com/600x400/cf78cf/000.png&text=TierZooDaily",
          username: "PotatoBug111",
          description:
            "An app that generates interesting animal videos every 24 hours.",
          technologies: ["C++", "GPT-3", "Tensorflow"],
          startDate: '2021-01-20',
          endDate: '2021-12-02'
        },
        {
          id: "3",
          title: "Pigma",
          bgColor: "5cf",
          fontColor: "fff",
          imageUrl: `https://dummyimage.com/600x400/5cf/fff.png&text=Pigma`,
          username: "WebMaster2021",
          description:
            "An app that allows you to decorate an augmented reality pig while it runs around your living room.",
          technologies: ["WebGL", "MongoDB", "Java"],
          startDate: '2021-01-20',
          endDate: '2021-12-02'
        },
        {
          id: "4",
          title: "Moonwalk Shoes",
          bgColor: "cc87fc",
          fontColor: "f1c",
          imageUrl:
          "https://dummyimage.com/600x400/cf78cf/fff.png&text=MoonwalkShoes",
          username: "Jackson5",
          description:
          "A marketplace for one of a kind dancing shoes inspired by the king of pop.",
          technologies: ["HTML", "CSS", "PHP"],
          startDate: '2021-01-20',
          endDate: '2021-12-02'
      }
    ],
    user: {
      id: 'abc123',
      projects: ['1','2']
    }
  },
  mutations: {},
  actions: {},
  getters: {
    loadedProjects(state) {
      return state.loadedProjects.sort((projectA, projectB) => {
        return projectA.endDate > projectB.endDate
      })
    },
    featuredProjects(state, getters) {
      return getters.loadedProjects.slice(0,3)
    },
    loadedProject(state) {
      return (projectId) => {
        return state.loadedProjects.find((project) => {
          return project.id === projectId
        })
      }
    }
  }
})