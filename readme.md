# Persephone Web Frontend

This is the web frontend for the [Persephone](https://persephone-asr.org) project.

This provides an easy to use interface to the Persephone ASR tool that you can run from your web browser.
The aim of this project is to make it easy for people to use the Persephone in their transcription workflows without needing to do software development.

This frontend interacts with the [Persephone web API](https://github.com/persephone-tools/persephone-web-API).

## Installation and usage

An automated install for this frontend code is provided in a docker file at [./Dockerfile](https://github.com/persephone-tools/persephone-frontend/blob/master/Dockerfile).

We have build automation set up so that this build is available on Docker Hub at `persephonetools/frontend:latest`.

If you wish to build locally you can do so with:

```sh
docker build -t persephonefrontend:dev .
```

Then to run:

```sh
docker run -p 8000:8000/tcp persephonefrontend:dev
```

At this point the web frontend will be served up on localhost at port 8000. Point your browser to there to verify it is working.

Note that the frontend must interact with the API server to work and that server must be running and accessible.
If you are looking to use the whole stack the easiest way to get started is to use the docker-compose setup found in the [persephone-docker repository](https://github.com/aapeliv/persephone-docker) as this will automate the install and setup of the API server along with the frontend.

## Support

If you find an issue with this code please open an issue on the [issues tracker](https://github.com/aapeliv/persephone-frontend/issues).

Please use the [discussion mailing list](https://lists.persephone-asr.org/postorius/lists/discuss.lists.persephone-asr.org/) to discuss other questions regarding this project.

## Contributors

* [Aapeli Vuorinen](https://www.customprogrammingsolutions.com/about/aapeli-vuorinen)
* [Janis Lesinskis](https://www.customprogrammingsolutions.com/about/janis-lesinskis)
