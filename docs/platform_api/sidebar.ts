import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "platform_api/plexicus-api",
    },
    {
      type: "category",
      label: "Authentication",
      items: [
        {
          type: "doc",
          id: "platform_api/auth-login-login-post",
          label: "Login user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/auth-logout-logout-post",
          label: "Logout user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/auth-session-session-get",
          label: "Read user session",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/auth-register-register-post",
          label: "Register user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/request-password-reset-password-reset-request-post",
          label: "Request password reset",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/confirm-password-reset-password-reset-confirm-post",
          label: "Confirm password reset",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Authentication - Verify Register",
      items: [
        {
          type: "doc",
          id: "platform_api/resend-verification-resend-verification-token-get",
          label: "Resend verification user",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/verify-user-register-verify-register-token-get",
          label: "Verify user register",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/verifiy-register-token-verify-register-token-post",
          label: "Verify user register",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/accept-verification-token-accept-verification-token-post",
          label: "Accept verification user",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Authentication - Two Factor Authentication",
      items: [
        {
          type: "doc",
          id: "platform_api/user-configure-2-fa-user-configure-2-fa-post",
          label: "Configure 2FA",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/verify-session-verify-session-post",
          label: "Verify session 2FA",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/user-check-2-fa-user-check-2-fa-post",
          label: "Check 2FA",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/user-save-2-fa-user-save-2-fa-post",
          label: "Save 2FA",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/user-remove-2-fa-user-remove-2-fa-post",
          label: "Remove 2FA",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Dashboard",
      items: [
        {
          type: "doc",
          id: "platform_api/findings-chart-findings-chart-get",
          label: "Findings chart",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/owasp-chart-owasp-chart-get",
          label: "OWASP chart",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/owasp-cicd-chart-owasp-cicd-chart-get",
          label: "OWASP CI/CD chart",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/get-supply-chains-supply-chains-get",
          label: "Get supply chains",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/supply-chain-chart-supply-chain-chart-get",
          label: "Supply chain chart",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/total-findings-chart-total-findings-chart-get",
          label: "Total findings chart",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Applications",
      items: [
        {
          type: "doc",
          id: "platform_api/get-repository-repositories-repository-id-get",
          label: "Get repository",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/delete-repository-repositories-repository-id-delete",
          label: "Delete repository",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "platform_api/get-repositories-repositories-get",
          label: "Get repositories",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/create-workflow-pr-repositories-repository-id-create-workflow-pr-post",
          label: "Create workflow PR",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/get-repo-tags-repo-tags-get",
          label: "Get repo tags",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/download-csv-repositories-download-csv-repos-post",
          label: "Download CSV repositories",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Applications - Manage Applications",
      items: [
        {
          type: "doc",
          id: "platform_api/create-repository-with-list-create-repository-with-list-post",
          label: "Create repository with list",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Findings",
      items: [
        {
          type: "doc",
          id: "platform_api/get-findings-findings-get",
          label: "Get Findings",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/get-finding-selected-columns-findings-columns-selected-get",
          label: "Get Finding Selected Columns",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/save-finding-selected-columns-findings-columns-save-post",
          label: "Save Finding Selected Columns",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/finding-send-bulk-data-finding-send-bulk-post",
          label: "Bulk Actions Send Findings to Developer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/generate-bulk-remediation-bulk-actions-generate-patch-post",
          label: "Generate bulk AI remediation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/findings-by-repo-chart-findings-by-repo-chart-get",
          label: "Findings by repository chart",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/upload-scan-upload-scan-repository-id-post",
          label: "Upload scan",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/pull-request-bulk-actions-apply-patch-post",
          label: "Apply bulk pull request patch",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/download-json-findings-download-json-findings-post",
          label: "Download JSON findings",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Findings - Detail",
      items: [
        {
          type: "doc",
          id: "platform_api/get-finding-findings-finding-id-get",
          label: "Get Finding",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/finding-send-data-finding-send-finding-id-post",
          label: "Send Finding to developer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/finding-detail-report-findings-finding-id-report-post",
          label: "Generate Finding Report",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/toggle-false-positive-findings-finding-id-toggle-false-positive-put",
          label: "Toggle False Positive",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "platform_api/get-users-developer-list-users-developer-get",
          label: "Get users developer list",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/get-owasps-owasps-get",
          label: "Get OWASPS",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Findings - Detail Remediation",
      items: [
        {
          type: "doc",
          id: "platform_api/generate-issue-issues-finding-id-post",
          label: "Generate issue",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/generate-remediation-remediations-finding-id-post",
          label: "Generate AI remediation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/get-remediation-remediations-finding-id-get",
          label: "Get remediation",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/edit-remediation-remediations-remediation-id-edit-put",
          label: "Edit remediation",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "platform_api/fill-template-remediation-fill-template-remediation-id-post",
          label: "Fill template remediation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/pull-request-pull-request-post",
          label: "Create pull request",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/create-issue-create-issue-post",
          label: "Create issue on SCM",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Findings - Filter App",
      items: [
        {
          type: "doc",
          id: "platform_api/filter-findings-filter-findings-get",
          label: "Filter Findings",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/get-findings-filter-selected-findings-filter-selected-get",
          label: "Get Findings Filter Selected",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/save-findings-filter-findings-filter-save-post",
          label: "Save Findings Filter",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/activate-findings-filter-findings-filter-update-activate-put",
          label: "Update Findings Filter Activate",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "platform_api/activate-findings-filter-findings-filter-name-update-activate-put",
          label: "Update Findings Filter Activate by Finding Type",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "platform_api/activate-findings-filter-findings-filter-activate-name-post",
          label: "Activate Findings Filter by Name",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/delete-findings-filter-findings-filter-delete-name-delete",
          label: "Delete Findings Filter by Name",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "platform_api/get-finding-types-finding-types-get",
          label: "Get finding types",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Findings - Filter SCM",
      items: [
        {
          type: "doc",
          id: "platform_api/filter-findings-filter-findings-get",
          label: "Filter Findings",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/get-findings-filter-selected-findings-filter-scm-selected-get",
          label: "Get Findings Filter SCM Selected",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/save-findings-filter-findings-filter-scm-save-post",
          label: "Save Findings Filter SCM",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/activate-findings-filter-findings-filter-scm-update-activate-put",
          label: "Update Findings Filter SCM Activate",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "platform_api/activate-findings-filter-findings-filter-scm-name-update-activate-put",
          label: "Update Findings Filter SCM Activate by Name",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "platform_api/activate-findings-filter-findings-filter-scm-activate-name-post",
          label: "Activate Findings Filter SCM by Name",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/delete-findings-filter-findings-filter-scm-delete-name-delete",
          label: "Delete Findings Filter SCM by Name",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "platform_api/get-finding-types-finding-types-get",
          label: "Get finding types",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Findings - Filter Cloud",
      items: [
        {
          type: "doc",
          id: "platform_api/filter-findings-filter-findings-get",
          label: "Filter Findings",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/get-findings-filter-selected-findings-filter-cloud-selected-get",
          label: "Get Findings Filter Cloud Selected",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/save-findings-filter-findings-filter-cloud-save-post",
          label: "Save Findings Filter Cloud",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/activate-findings-filter-findings-filter-cloud-update-activate-put",
          label: "Update Findings Filter Cloud Activate",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "platform_api/activate-findings-filter-findings-filter-cloud-name-update-activate-put",
          label: "Update Findings Filter Cloud Activate by Name",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "platform_api/activate-findings-filter-findings-filter-cloud-activate-name-post",
          label: "Activate Findings Filter Cloud by Name",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/delete-findings-filter-findings-filter-cloud-delete-name-delete",
          label: "Delete Findings Filter Cloud by Name",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "platform_api/get-finding-types-finding-types-get",
          label: "Get finding types",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Settings - Account",
      items: [
        {
          type: "doc",
          id: "platform_api/change-password-user-change-password-post",
          label: "Change password",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Settings - API Token",
      items: [
        {
          type: "doc",
          id: "platform_api/generate-user-api-token-user-generate-api-token-post",
          label: "Generate API token",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/list-user-api-tokens-user-api-tokens-get",
          label: "List API tokens",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Settings - Client",
      items: [
        {
          type: "doc",
          id: "platform_api/get-client-client-get",
          label: "Get Client",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/update-client-client-put",
          label: "Update Client",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "platform_api/update-client-company-info-client-update-company-info-put",
          label: "Update Client Organization Information",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Settings - OpenAI Connections",
      items: [
        {
          type: "doc",
          id: "platform_api/client-get-openai-config-client-openai-get",
          label: "Get Client OpenAI Configuration",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/openai-connection-openai-test-connection-post",
          label: "Test & save OpenAI connection",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/remediatior-connection-openai-remediator-connection-post",
          label: "Test & save OpenAI remediator connection",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Settings - Team",
      items: [
        {
          type: "doc",
          id: "platform_api/get-invitations-team-get",
          label: "Get Invitations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/invite-team-team-post",
          label: "Invite Team",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/delete-team-member-team-member-id-delete",
          label: "Delete Team Member",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Integrations - Connectors - Domain Verification",
      items: [
        {
          type: "doc",
          id: "platform_api/add-domain-domains-post",
          label: "Add Domain",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/list-domains-domains-get",
          label: "List Domains",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/verify-domain-domains-verify-post",
          label: "Verify Domain",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/bind-domain-bind-domain-post",
          label: "Bind Domain",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Integrations - Providers - SCM",
      items: [
        {
          type: "doc",
          id: "platform_api/get-configuration-github-installation-id-get",
          label: "Get Github Installation Id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/save-configuration-github-save-configuration-post",
          label: "Save Github Installation Id",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/delete-github-configuration-github-delete-configuration-delete",
          label: "Delete Github Installation Id",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Integrations - Providers - Cloudquery",
      items: [
        {
          type: "doc",
          id: "platform_api/cloudquery-cnapp-cloudquery-post",
          label: "Cloudquery",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Integrations - Providers - Registry",
      items: [
        {
          type: "doc",
          id: "platform_api/create-registry-image-scan-create-registry-image-scan-post",
          label: "Create Registry Image Scan",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/get-container-spec-container-specs-container-spec-id-get",
          label: "Get Container Spec",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/delete-container-spec-container-specs-container-spec-id-delete",
          label: "Delete Container Spec",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "platform_api/update-container-spec-container-specs-container-spec-id-put",
          label: "Update Container Spec",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Integrations - Providers - Cloud",
      items: [
        {
          type: "doc",
          id: "platform_api/create-cloud-scan-create-cloud-scan-post",
          label: "Create Cloud Scan",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/get-container-spec-container-specs-container-spec-id-get",
          label: "Get Container Spec",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/delete-container-spec-container-specs-container-spec-id-delete",
          label: "Delete Container Spec",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "platform_api/update-container-spec-container-specs-container-spec-id-put",
          label: "Update Container Spec",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Integrations - Providers - Webhook",
      items: [
        {
          type: "doc",
          id: "platform_api/send-ticket-webhook-send-ticket-post",
          label: "Plexicus Webhook",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Vulnerability Tool",
      items: [
        {
          type: "doc",
          id: "platform_api/initiate-oauth-flow-vulnerability-tool-auth-provider-get",
          label: "Initiate OAuth Flow",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/handle-oauth-callback-vulnerability-tool-callback-provider-get",
          label: "Handle Oauth Callback",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/get-user-profile-vulnerability-tool-profile-provider-get",
          label: "Get User Profile",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/get-user-config-provider-vulnerability-tool-config-provider-get",
          label: "Get User Config Provider",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/refresh-access-token-vulnerability-tool-refresh-provider-post",
          label: "Refresh Access Token",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/list-repositories-vulnerability-tool-repositories-provider-get",
          label: "List Repositories",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/initiate-vulnerability-scan-vulnerability-tool-scan-provider-post",
          label: "Initiate Vulnerability Scan",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/result-vulnerability-scan-vulnerability-tool-scan-provider-get",
          label: "Result Vulnerability Scan",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/delete-integration-vulnerability-tool-integrations-provider-delete",
          label: "Delete Integration",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "platform_api/toggle-deep-reasoning-enrichment-client-toggle-deep-reasoning-enrichment-put",
          label: "Toggle Deep Reasoning Enrichment",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "platform_api/get-base-config-base-config-get",
          label: "Get Base Config",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/create-custom-parameter-custom-parameters-tool-name-post",
          label: "Create Custom Parameter",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "platform_api/get-custom-parameters-by-tool-custom-parameters-tool-name-get",
          label: "Get Custom Parameters By Tool",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/get-custom-parameters-custom-parameters-get",
          label: "Get Custom Parameters",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/update-custom-parameter-custom-parameters-tool-name-param-id-put",
          label: "Update Custom Parameter",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "platform_api/delete-custom-parameter-custom-parameters-tool-name-param-id-delete",
          label: "Delete Custom Parameter",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "platform_api/get-tool-config-values-values-get",
          label: "Get Tool Config Values",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/get-tool-config-values-by-tool-values-tool-name-get",
          label: "Get Tool Config Values By Tool",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "platform_api/update-tool-config-values-values-tool-name-put",
          label: "Update Tool Config Values",
          className: "api-method put",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
