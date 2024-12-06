import json

def filter_openapi_spec(input_file, output_file, allowed_endpoints):
    """
    Filters the OpenAPI spec to only include the specified allowed endpoints.
    
    :param input_file: Path to the original OpenAPI spec (openapi.json)
    :param output_file: Path to the filtered OpenAPI spec (filtered_openapi.json)
    :param allowed_endpoints: List of paths/operation IDs to retain in the OpenAPI spec
    """
    # Load the OpenAPI spec
    with open(input_file, 'r') as f:
        openapi_spec = json.load(f)
    
    # Filter paths based on the allowed endpoints
    filtered_paths = {}
    for path, path_data in openapi_spec['paths'].items():
        for method, method_data in path_data.items():
            operation_id = method_data.get('operationId')
            if operation_id and operation_id in allowed_endpoints:
                if path not in filtered_paths:
                    filtered_paths[path] = {}
                filtered_paths[path][method] = method_data
    
    # Replace the paths in the OpenAPI spec with the filtered ones
    openapi_spec['paths'] = filtered_paths
    
    # Write the filtered spec to the output file
    with open(output_file, 'w') as f:
        json.dump(openapi_spec, f, indent=2)

if __name__ == "__main__":
    input_file = 'docs/api-reference/openapi.json'  # Path to the original OpenAPI spec
    output_file = 'docs/api-reference/filtered_openapi.json'  # Path to the filtered OpenAPI spec
    
    # List of allowed operation IDs
    allowed_endpoints = [
        "get_findings_findings_get",
        "get_repositories_repositories_get",   
        "findings_by_repo_chart_findings_by_repo_chart_get",
        "findings_chart_findings_chart_get",
        "owasp_chart_owasp_chart_get",
        "owasp_cicd_chart_owasp_cicd_chart_get",
        "slsa_threats_chart_slsa_threats_chart_get",
        "supply_chain_chart_supply_chain_chart_get",
        "total_findings_chart_total_findings_chart_get"
    ]
    
    # Filter the OpenAPI spec and save it
    filter_openapi_spec(input_file, output_file, allowed_endpoints)
    print(f"Filtered OpenAPI spec saved to {output_file}")
