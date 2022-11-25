import React from "react";
import { Row, Container } from "react-bootstrap";
import styles from "./style/style.module.css";
import ImageCard from "./imagecard";
import Skill from "./Skill";
import WorkExp from "./WorkExperience";

const arr = [
  {
    id: 1,
    company: "CISCO",
    duration: "1",
    verified: true,
  },
  {
    id: 2,
    company: "Amazon",
    duration: "1",
    verified: false,
  },
  {
    id: 3,
    company: "Swiggy",
    duration: "2",
    verified: true,
  },
  {
    id: 4,
    company: "TCS",
    duration: "6",
    verified: false,
  },
  {
    id: 5,
    company: "Barclays",
    duration: "1",
    verified: false,
  },
];

const arr1 = [
  {
    id: 1,
    skill: "HTML",
    orgendorse: [
    {
      name:"Amazon",
      img:""
    },
    {
      name:"TCS",
      img:""
    },
    {
      name:"Oracle",
      img:""
    }
  ],
    peerendorse: [
      {
        name:"Ruby Thakur",
        img:""
      },
      {
        name:"Nidhi Singh",
        img:""
      },
      {
        name:"Purav Shah",
        img:""
      }
    ]
  },
  {
    id: 2,
    skill: "Kotlin",
    orgendorse: [
      {
        name:"TCS",
        img:""
      },
      {
        name:"IIFL",
        img:""
      }
    ],
      peerendorse: [
        {
          name:"Shivam Thakur",
          img:""
        },
        {
          name:"Rana Sehgal",
          img:""
        },
      ]
  },
  {
    id: 3,
    skill: "JavaScript",
    orgendorse: [
      {
        name:"Morgan Stanley",
        img:""
      },
    ],
      peerendorse: [
        {
          name:"Mohan Kulkarni",
          img:""
        },
      ]
  },
];

const Profile = () => {
  return (
    <Container>
      <Row className={styles.rw}>
        <ImageCard />
      </Row>
      <Skill detailsarr={arr1} />
      <WorkExp detailsarr={arr} />
    </Container>
  );
};

export default Profile;
