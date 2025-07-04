import React from 'react';
import {Route} from 'react-router-dom';
import {apiDocsPlugin, ApiExplorerPage} from '@backstage/plugin-api-docs';
import {CatalogEntityPage, CatalogIndexPage, catalogPlugin,} from '@backstage/plugin-catalog';
import {CatalogImportPage, catalogImportPlugin,} from '@backstage/plugin-catalog-import';
import {ScaffolderPage, scaffolderPlugin} from '@backstage/plugin-scaffolder';
import {orgPlugin} from '@backstage/plugin-org';
import {SearchPage} from '@backstage/plugin-search';
import {TechRadarPage} from '@backstage-community/plugin-tech-radar';
import {DefaultTechDocsHome, TechDocsIndexPage, techdocsPlugin, TechDocsReaderPage,} from '@backstage/plugin-techdocs';
import {TechDocsAddons} from '@backstage/plugin-techdocs-react';
import {ReportIssue} from '@backstage/plugin-techdocs-module-addons-contrib';
import {UserSettingsPage} from '@backstage/plugin-user-settings';
import {apis} from './apis';
import {entityPage} from './components/catalog/EntityPage';
import {searchPage} from './components/search/SearchPage';
import {Root} from './components/Root';
import {HomepageCompositionRoot, VisitListener} from '@backstage/plugin-home';
import {HomePage} from './components/home/HomePage';
import {AlertDisplay, OAuthRequestDialog} from '@backstage/core-components';
import {createApp} from '@backstage/app-defaults';
import {AppRouter, FlatRoutes} from '@backstage/core-app-api';
import {CatalogGraphPage} from '@backstage/plugin-catalog-graph';
import {RequirePermission} from '@backstage/plugin-permission-react';
import {catalogEntityCreatePermission} from '@backstage/plugin-catalog-common/alpha';
import {ExplorePage} from '@backstage-community/plugin-explore';
import {LighthousePage} from '@backstage-community/plugin-lighthouse';
import {DevToolsPage} from '@backstage/plugin-devtools';
import {DaskOnboardingPage} from '@internal/backstage-plugin-dask-onboarding';
import {pluginRiScNorwegianTranslation} from '@kartverket/backstage-plugin-risk-scorecard';
import {OpencostPage} from "@kartverket/backstage-plugin-opencost";

const app = createApp({
    __experimentalTranslations: {
        availableLanguages: ['en', 'no'],
        resources: [pluginRiScNorwegianTranslation],
    },
    apis,
    bindRoutes({bind}) {
        bind(catalogPlugin.externalRoutes, {
            createComponent: scaffolderPlugin.routes.root,
            viewTechDoc: techdocsPlugin.routes.docRoot,
            createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
        });
        bind(apiDocsPlugin.externalRoutes, {
            registerApi: catalogImportPlugin.routes.importPage,
        });
        bind(scaffolderPlugin.externalRoutes, {
            registerComponent: catalogImportPlugin.routes.importPage,
            viewTechDoc: techdocsPlugin.routes.docRoot,
        });
        bind(orgPlugin.externalRoutes, {
            catalogIndex: catalogPlugin.routes.catalogIndex,
        });
    }
});

const routes = (
    <FlatRoutes>
        <Route path="/" element={<HomepageCompositionRoot/>}>
            <HomePage/>
        </Route>
        <Route path="/catalog" element={<CatalogIndexPage/>}/>
        <Route
            path="/catalog/:namespace/:kind/:name"
            element={<CatalogEntityPage/>}
        >
            {entityPage}
        </Route>
        <Route path="/catalog-graph" element={<CatalogGraphPage/>}/>
        <Route path="/dask-onboarding" element={<DaskOnboardingPage/>}/>
        <Route path="/api-docs" element={<ApiExplorerPage />} />
        <Route path="/docs" element={<TechDocsIndexPage />}>
          <DefaultTechDocsHome />
        </Route>
        <Route path="/docs/:namespace/:kind/:name/*" element={<TechDocsReaderPage>
            <TechDocsAddons>
              <ReportIssue />
            </TechDocsAddons>
          </TechDocsReaderPage>}
        />
        <Route path="/search" element={<SearchPage />}>
          {searchPage}
        </Route>
        <Route path="/settings" element={<UserSettingsPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/create" element={
            <RequirePermission permission={catalogEntityCreatePermission}>
              <ScaffolderPage />
            </RequirePermission>
          }
        />
        <Route path="/import" element={<CatalogImportPage />} />
        <Route path="/lighthouse" element={<LighthousePage />} />
        <Route path="/tech-radar" element={<TechRadarPage width={1500} height={800} />} />
        <Route path="/devtools" element={<DevToolsPage />} />
        <Route path="/opencost" element={<OpencostPage />} />
    </FlatRoutes>
);

export default app.createRoot(
    <>
        <AlertDisplay/>
        <OAuthRequestDialog/>
        <AppRouter>
            <VisitListener/>
            <Root>{routes}</Root>
        </AppRouter>
    </>,
);
