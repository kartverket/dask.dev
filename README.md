# dask.dev

Backstage-komponenter for DASK. Fork av `kartverket.dev`

## Kjør lokalt:

For at du skal få kjørt alt i prosjektet må du installere Node (18+), yarn (1.22) og Python (3.12). 

Hvis du ikke har Python installert globalt, kan du sette opp et virtuelt miljø slik:

```sh
python3.12 -m venv .venv && source .venv/bin/activate
```

1. Autentiser deg mot Google med service account i sandbox:

```sh
gcloud auth application-default login --impersonate-service-account dataplattform-deploy@dataplattform-sandbox-6f27.iam.gserviceaccount.com
```

1. Kjør
```sh
yarn build:all
```

1. Kjør
```sh
yarn tsc
```

2. Kjør yarn sammen med riktig prosjekt-ID i én og samme kommando:

```sh
DASK_GCP_PROJECT_ID="dataplattform-sandbox-6f27" TOPIC_ID="onboarding_topic" yarn dev 
```

## Release ny versjon av plugin

1. Bump versjon for plugin, bytt `@internal` til `@kartverket` og sett `"private": false` i `package.json`
2. Kjør `yarn build` og deretter `yarn prepack` i mappen til den respektive pluginen
3. Kjør til slutt `npm publish`. Brukernavn og passord finnes i Secret Manager i dataplattform-prod-prosjektet
> **NB:** Her har man satt på tofaktor-autentisering. Per nå er det bare @jonasmw94 som har tilgang til denne
4. Fjern endringene som blir gjort i `"main"` og `"types"` i `package-json` 
5. Bytt tilbake til `"private": true` og `@internal`. Dette er for å ha hot reloading under utvikling
6. Verifiser til slutt at ting fungerer som det skal ved å kjøre opp endringene lokalt
