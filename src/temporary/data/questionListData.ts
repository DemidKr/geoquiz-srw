import {IQuestion} from "../../shared/types/IQuestion";
import pic from "../../shared/images/TemporaryPicture.jpg";
import secondPic from "../../shared/images/TempPic2.jpg";

export const hardcodedQuestions: IQuestion[] = [
    {
        id: 0,
        title: 'Название',
        description: 'Описание',
        username: 'Пользователь',
        time: 90,
        stars: 4.3,
        timesFinished: 54,
        steps: 6,
        coordinates: [[1,1]],
        imageUrl: pic
    },
    {
        id: 1,
        title: 'Название два',
        description: 'Описание два',
        username: 'Димас123',
        time: 45,
        stars: 5,
        timesFinished: 10,
        steps: 10,
        coordinates: [[1,1]],
        imageUrl: secondPic
    },
    {
        id: 0,
        title: 'Название',
        description: 'Описание',
        username: 'Пользователь',
        time: 90,
        stars: 1,
        timesFinished: 54,
        steps: 6,
        coordinates: [[1,1]],
        imageUrl: pic
    },
    {
        id: 1,
        title: 'Название два',
        description: 'Описание два',
        username: 'Димас123',
        time: 45,
        stars: 2.6,
        timesFinished: 10,
        steps: 10,
        coordinates: [[1,1]],
        imageUrl: secondPic
    },
    {
        id: 0,
        title: 'Название',
        description: 'Описание',
        username: 'Пользователь',
        time: 90,
        stars: 2.45,
        timesFinished: 54,
        steps: 6,
        coordinates: [[1,1]],
        imageUrl: pic
    },
    {
        id: 1,
        title: 'Название два',
        description: 'Описание два',
        username: 'Димас123',
        time: 45,
        stars: 4.44,
        timesFinished: 10,
        steps: 10,
        coordinates: [[1,1]],
        imageUrl: secondPic
    },
]