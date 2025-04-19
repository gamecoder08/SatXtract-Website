# SatXtract-Website


## Installation

To use this project, Clone this repository:

```bash
https://github.com/gamecoder08/SatXtract-Website.git
```

1. Open any terminal and navigate to <kbd> /Back-End </kbd> folder and run following command:
    - This commnad will allow to run back-end connected to frontend constructed on flask on port <kbd>5000</kbd>.

```bash
cd Back-End

python receiveWebData.py
```

2. Simultaneously open another terminal and navigate to <kbd> /Front-End </kbd>. Then, run following commands:
    - <kbd>npm run dev</kbd> will start the development mode in Next.js on port <kbd>3000</kbd>.


```bash
cd Front-End

# Install all packages declared in package.json file.
npm init
```

```bash
npm run dev
```

PS: The project is in development mode, thus mutiple bugs and issues may be encountered.

## File Structure

- <kbd> /Back-End</kbd> File structure

```text
+---Back-End
|   |   gee_utils.py
|   |   modelRun.py
|   |   receiveWebData.py
|   |   tempCodeRunnerFile.py
|   |   
|   +---src
|   |   |   create_rasters.py
|   |   |   plot.py
|   |   |   predict.py
|   |   |   predict_from_folder.py
|   |   |   predict_orthophotos.py
|   |   |   prepare_data.py
|   |   |   prepare_lst_layer.py
|   |   |   smooth_tiled_predictions.py
|   |   |   utils.py
|   |   |   __init__.py

```

- <kbd>Front-End</kbd> File Structure

```text
|   +---app
|   |   |   favicon.ico
|   |   |   globals.css
|   |   |   layout.tsx
|   |   |   page.tsx
|   |   |   
|   |   +---api
|   |   |   +---getResults
|   |   |   |       route.js
|   |   |   |       
|   |   |   +---runModel
|   |   |   |       route.js
|   |   |   |       
|   |   |   +---sendDateData
|   |   |   |       route.js
|   |   |   |       
|   |   |   +---sendMapData
|   |   |   |       route.js
|   |   |   |       
|   |   |   \---sendModelData
|   |   |           route.js
|   |   |           
|   |   +---components
|   |   |       ThemeButton.tsx
|   |   |       
|   |   \---mainPage
|   |       |   page.tsx
|   |       |   
|   |       \---components
|   |           |   calender.tsx
|   |           |   mapContent.tsx
|   |           |   modelResult.jsx
|   |           |   modelSelect.tsx
|   |           |   resultContent.jsx
|   |           |   resultDisplay.jsx
|   |           |   uhiDisplay.tsx
|   |           |   uhiImages.tsx
|   |           |   uploadFile.tsx
|   |           |   
|   |           \---LiveMap
|   |                   index.tsx
|   |                   mapDisplay.tsx
|   |                   
|   |   |   .package-lock.json
```

## Related Links

In this project, use of <kbd>huggingface-models</kbd> involves. All models used in this project are downloaded from huggingface model repository created by @debasishray16.

<kbd>https://huggingface.co/debasishray16/satellite_image_segmentation_ResNet_Models/tree/main</kbd>
## Deployment

## Stacks Used

![Anaconda](https://img.shields.io/badge/Anaconda-%2344A833.svg?style=for-the-badge&logo=anaconda&logoColor=white)
![nVIDIA](https://img.shields.io/badge/cuda-000000.svg?style=for-the-badge&logo=nVIDIA&logoColor=green)
![OpenCV](https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white)
![nVIDIA](https://img.shields.io/badge/nVIDIA-%2376B900.svg?style=for-the-badge&logo=nVIDIA&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white)
![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black)
![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)
![Plotly](https://img.shields.io/badge/Plotly-%233F4F75.svg?style=for-the-badge&logo=plotly&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)
![SciPy](https://img.shields.io/badge/SciPy-%230C55A5.svg?style=for-the-badge&logo=scipy&logoColor=%white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![PyPi](https://img.shields.io/badge/pypi-%23ececec.svg?style=for-the-badge&logo=pypi&logoColor=1f73b7)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL-990000?logo=webgl&logoColor=white&style=for-the-badge)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Bash Script](https://img.shields.io/badge/bash_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![YAML](https://img.shields.io/badge/yaml-%23ffffff.svg?style=for-the-badge&logo=yaml&logoColor=151515)
