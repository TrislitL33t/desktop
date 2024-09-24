// _document.tsx

import NextDocument, {
  type DocumentContext,
  type DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import { DEFAULT_LOCALE } from "utils/constants";

const withStyledComponents = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps> => {
  const { renderPage } = ctx;
  const sheet = new ServerStyleSheet();

  try {
    ctx.renderPage = () =>
      renderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [initialProps.styles, sheet.getStyleElement()],
    };
  } finally {
    sheet.seal();
  }
};

class Document extends NextDocument {
  public static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    return withStyledComponents(ctx);
  }

  public render(): React.ReactElement {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    return (
      <Html lang={DEFAULT_LOCALE}>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {measurementId && (
            <>
              <script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                async
              />
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    window.gtag = window.gtag || function(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${measurementId}', {
                      page_path: window.location.pathname,
                      anonymize_ip: true,
                    });
                  `,
                }}
              />
            </>
          )}
          {/* Existing Head content can remain here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
