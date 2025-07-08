# dask.dev

Backstage-komponenter for DASK. Fork av `kartverket.dev`

## Kjør lokalt:

For at du skal få kjørt alt i prosjektet må du installere Node (18+) og yarn (4.6.0)

Alle kommandoer listet her er forventet at du kjører fra rotmappa.

1. Autentiser deg mot Google med service account i sandbox:
   ```sh
   gcloud auth application-default login --impersonate-service-account dataplattform-deploy@dataplattform-sandbox-6f27.iam.gserviceaccount.com
   ```

1. Kjør
   ```
   yarn
   ```
   for å installere alle pakker

1. Kjør
   ```sh
   yarn build:all
   ```

1. Kjør
   ```sh
   yarn tsc
   ```

1. Kjør yarn sammen med riktig prosjekt-ID i én og samme kommando:
   ```sh
   DASK_GCP_PROJECT_ID="dataplattform-sandbox-6f27" TOPIC_ID="onboarding_topic" yarn dev 
   ```

__Merk:__ Har du problemer med å nå backstage-portalen på `localhost:3000` etter at den er spint opp? 
Prøv å bytte `baseUrl` fra `http://localhost:3000` til `http://127.0.0.1:3000` i `app-config.yaml  

## Release ny versjon av plugin

1. Juster `version`-feltet i `./plugins/<plugin_navn>/package.json` for pluginen du ønsker å release 
1. Bytt alle referanser fra `@internal` til `@kartverket` i __alle__ `package.json`-filer.
1. Kjørn `yarn` på nytt fra rotmappa for å installere alle pakker.
1. Sett `"private": false` i `./package.json`
1. Kjør `yarn build` og deretter `yarn prepack` fra `./plugins/<plugin_navn>`
1. Kjør til slutt `npm publish`. Brukernavn er `dataplattform-kartverket` og passord finnes i Secret Manager i dataplattform-prod-prosjektet
   > **NB:** Her har man satt på tofaktor-autentisering. Per nå er det bare @sondrfos som har tilgang til denne
1. Fjern endringene som blir gjort i `"main"` og `"types"` i `package-json` 
1. Bytt tilbake til `"private": true` og `@internal`. Dette er for å ha hot reloading under utvikling
1. Verifiser til slutt at ting fungerer som det skal ved å kjøre opp endringene lokalt
