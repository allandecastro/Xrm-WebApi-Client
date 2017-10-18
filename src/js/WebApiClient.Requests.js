/**
 * @description This is the collection of all preimplemented Web API actions and functions
 * @module Requests
 */
(function (undefined) {
    "use strict";

    var WebApiClient = require("./WebApiClient.Core.js");

    function AppendRequestParams(url, params) {
        url += "(";
        var paramCount = 1;

        for (var parameter in params) {
            if (!params.hasOwnProperty(parameter)) {
                continue;
            }

            if (paramCount !== 1) {
                url += ",";
            }

            url += parameter + "=@p" + paramCount++;
        }

        url += ")";

        return url;
    }

    function AppendParamValues (url, params) {
        var paramCount = 1;

        for (var parameter in params) {
            if (!params.hasOwnProperty(parameter)) {
                continue;
            }

            if (paramCount === 1) {
                url += "?@p1=";
            }
            else {
                url += "&@p" + paramCount + "=";
            }
            paramCount++;

            url += params[parameter];
        }

        return url;
    }

    var Requests = {};

    /**
     * @description Base class for all actions and functions.
     * @constructor
     * @param {Object} parameters
     * @param {String} parameters.method The HTTP method of the request, such as GET / POST / ...
     * @param {String} parameters.name The name of the request
     * @param {bool} [parameters.bound] Determines if request is bound, i.e. always executed regarding a distinct record, or not. Defaults to false
     * @param {String} [parameters.entityName] Name of the request if it is bound to an entity
     * @param {String} [parameters.entityId] Record ID if bound to an entity
     * @param {Object} [parameters.payload] Message body for this request
     * @param {Array<{key:string, value:string}>} [parameters.headers] Headers to append to this request
     * @param {Object} [parameters.urlParams] Object with key-value pairs that will be appended to the URL of a GET request. Used for calling functions with parameters
     * @param {bool} [parameters.async] Determines if request is sent async or not. Defaults to async
     * @memberof module:Requests
     * @this {Request}
     * @alias WebApiClient.Requests.Request
     */
    Requests.Request = function () {
        this.method = "";
        this.name = "";
        this.bound = false;
        this.entityName = "";
        this.entityId = "";
        this.payload = null;
        this.headers = null;
        this.urlParams = null;
        this.async = true;
    };

    /**
     * @description Applies properties of parameters object to the current request and returns it
     * @param {Object} parameters Pass object with properties that will be applied to current request
     * @return {Request}
     * @memberof module:Requests
     * @this {Request}
     */
    Requests.Request.prototype.with = function (parameters) {
        var request = Object.create(this);

        for (var parameter in parameters) {
            if (!parameters.hasOwnProperty(parameter)) {
                continue;
            }

            request[parameter] = parameters[parameter];
        }

        return request;
    };

    /**
     * @description Builds URL for sending a HTTP request based on the information provided by the request
     * @return {String}
     * @this {Request}
     */
    Requests.Request.prototype.buildUrl = function() {
        var baseUrl = WebApiClient.GetApiUrl();
        var url = baseUrl;

        if (this.bound && this.entityId) {
            var entityId = this.entityId.replace("{", "").replace("}", "");
            url += WebApiClient.GetSetName(this.entityName) + "(" + entityId + ")/";
        }

        if (this.bound && this.name.indexOf("Microsoft.Dynamics.CRM.") === -1) {
            url += "Microsoft.Dynamics.CRM.";
        }
        url += this.name;

        if (this.urlParams) {
            url = AppendRequestParams(url, this.urlParams);
            url = AppendParamValues(url, this.urlParams);
        } else {
            url += "()";
        }

        return url;
    };

    // Functions

    /**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt718083.aspx
     * @description Calculates the value of a rollup attribute.
     * @alias CalculateRollupFieldRequest
     */
    Requests.CalculateRollupFieldRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "CalculateRollupField",
            writeable: true
        }
    });

    /**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593054.aspx
     * @description Calculates the total time, in minutes, that you used while you worked on an incident (case).
     * @alias CalculateTotalTimeIncidentRequest
     */
    Requests.CalculateTotalTimeIncidentRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "CalculateTotalTimeIncident",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "incident",
            writeable: true
        }
    });

    /**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683529.aspx
     * @description Check whether the incoming email message is relevant to the Microsoft Dynamics 365 system.
     * @alias CheckIncomingEmailRequest
     */
    Requests.CheckIncomingEmailRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "CheckIncomingEmail",
            writeable: true
        }
    });

    /**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593013.aspx
     * @description Contains the data that is needed to check whether the incoming email message should be promoted to the Microsoft Dynamics 365 system.
     * @alias CheckPromoteEmailRequest
     */
    Requests.CheckPromoteEmailRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "CheckPromoteEmail",
            writeable: true
        }
    });

    /**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607800.aspx
     * @description Downloads a report definition.
     * @alias DownloadReportDefinitionRequest
     */
    Requests.DownloadReportDefinitionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "DownloadReportDefinition",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "report",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607824.aspx
	 * @description Converts the calendar rules to an array of available time blocks for the specified period.
     * @alias ExpandCalendarRequest
     */
    Requests.ExpandCalendarRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "ExpandCalendar",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "calendar",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593047.aspx
	 * @description Exports localizable fields values to a compressed file.
     * @alias ExportFieldTranslationRequest
     */
    Requests.ExportFieldTranslationRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "ExportFieldTranslation",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491169.aspx
	 * @description Converts a query in FetchXML to a QueryExpression.
     * @alias FetchXmlToQueryExpressionRequest
     */
    Requests.FetchXmlToQueryExpressionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "FetchXmlToQueryExpression",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683530.aspx
	 * @description Finds a parent resource group (scheduling group) for the specified resource groups (scheduling groups).
     * @alias FindParentResourceGroupRequest
     */
    Requests.FindParentResourceGroupRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "FindParentResourceGroup",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "resourcegroup",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593004.aspx
	 * @description Retrieves all the time zone definitions for the specified locale and to return only the display name attribute.
     * @alias GetAllTimeZonesWithDisplayNameRequest
     */
    Requests.GetAllTimeZonesWithDisplayNameRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetAllTimeZonesWithDisplayName",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608119.aspx
	 * @description Retrieves the default price level (price list) for the current user based on the user’s territory relationship with the price level.
     * @alias GetDefaultPriceLevelRequest
     */
    Requests.GetDefaultPriceLevelRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetDefaultPriceLevel",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt622422.aspx
	 * @description Retrieves distinct values from the parse table for a column in the source file that contains list values.
     * @alias GetDistinctValuesImportFileRequest
     */
    Requests.GetDistinctValuesImportFileRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetDistinctValuesImportFile",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "importfile",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt622408.aspx
	 * @description Retrieves the source-file column headings; or retrieve the system-generated column headings if the source file does not contain column headings.
     * @alias GetHeaderColumnsImportFileRequest
     */
    Requests.GetHeaderColumnsImportFileRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetHeaderColumnsImportFile",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "importfile",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683531.aspx
	 * @description Gets the quantity decimal value of a product for the specified entity in the target.
     * @alias GetQuantityDecimalRequest
     */
    Requests.GetQuantityDecimalRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetQuantityDecimal",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607697.aspx
	 * @description Retrieves the history limit for a report.
     * @alias GetReportHistoryLimitRequest
     */
    Requests.GetReportHistoryLimitRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetReportHistoryLimit",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "report",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607644.aspx
	 * @description Retrieves the time zone code for the specified localized time zone name.
     * @alias GetTimeZoneCodeByLocalizedNameRequest
     */
    Requests.GetTimeZoneCodeByLocalizedNameRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetTimeZoneCodeByLocalizedName",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608131.aspx
	 * @description Retrieves a list of all the entities that can participate in a Many-to-Many entity relationship.
     * @alias GetValidManyToManyRequest
     */
    Requests.GetValidManyToManyRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetValidManyToMany",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608031.aspx
	 * @description Retrieves a list of entity logical names that are valid as the primary entity (one) from the specified entity in a one-to-many relationship.
     * @alias GetValidReferencedEntitiesRequest
     */
    Requests.GetValidReferencedEntitiesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetValidReferencedEntities",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt592992.aspx
	 * @description Retrieves the set of entities that are valid as the related entity (many) to the specified entity in a one-to-many relationship.
     * @alias GetValidReferencingEntitiesRequest
     */
    Requests.GetValidReferencingEntitiesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetValidReferencingEntities",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683532.aspx
	 * @description Increments the per day view count of a knowledge article record.
     * @alias IncrementKnowledgeArticleViewCountRequest
     */
    Requests.IncrementKnowledgeArticleViewCountRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "IncrementKnowledgeArticleViewCount",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683533.aspx
	 * @description Initializes a new record from an existing record.
     * @alias InitializeFromRequest
     */
    Requests.InitializeFromRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "InitializeFrom",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607606.aspx
	 * @description Determines whether a solution component is customizable.
     * @alias IsComponentCustomizableRequest
     */
    Requests.IsComponentCustomizableRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "IsComponentCustomizable",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607678.aspx
	 * @description Determines whether data encryption is currently running (active or inactive).
     * @alias IsDataEncryptionActiveRequest
     */
    Requests.IsDataEncryptionActiveRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "IsDataEncryptionActive",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683534.aspx
	 * @description Validates the state transition.
     * @alias IsValidStateTransitionRequest
     */
    Requests.IsValidStateTransitionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "IsValidStateTransition",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683535.aspx
	 * @description Searches multiple resources for available time block that matches the specified parameters.
     * @alias QueryMultipleSchedulesRequest
     */
    Requests.QueryMultipleSchedulesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "QueryMultipleSchedules",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608100.aspx
	 * @description Searches the specified resource for an available time block that matches the specified parameters.
     * @alias QueryScheduleRequest
     */
    Requests.QueryScheduleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "QuerySchedule",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt622429.aspx
	 * @description Retrieves the absolute URL and the site collection URL for a SharePoint location record in Microsoft Dynamics 365.
     * @alias RetrieveAbsoluteAndSiteCollectionUrlRequest
     */
    Requests.RetrieveAbsoluteAndSiteCollectionUrlRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveAbsoluteAndSiteCollectionUrl",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491171.aspx
	 * @description TODO: RetrieveActivePath Function Description (No Joke, MS description)
     * @alias RetrieveActivePathRequest
     */
    Requests.RetrieveActivePathRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveActivePath",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607682.aspx
	 * @description Retrieves the collection of users that report to the specified system user (user).
     * @alias RetrieveAllChildUsersSystemUserRequest
     */
    Requests.RetrieveAllChildUsersSystemUserRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveAllChildUsersSystemUser",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683536.aspx
	 * @description Retrieves metadata information about all the entities.
     * @alias RetrieveAllEntitiesRequest
     */
    Requests.RetrieveAllEntitiesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveAllEntities",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607503.aspx
	 * @description Retrieve the data that defines the content and behavior of the application ribbon.
     * @alias RetrieveApplicationRibbonRequest
     */
    Requests.RetrieveApplicationRibbonRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveApplicationRibbon",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593106.aspx
	 * @description Retrieves the list of database partitions that are used to store audited history data.
     * @alias RetrieveAuditPartitionListRequest
     */
    Requests.RetrieveAuditPartitionListRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveAuditPartitionList",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607635.aspx
	 * @description Retrieves the list of language packs that are installed and enabled on the server.
     * @alias RetrieveAvailableLanguagesRequest
     */
    Requests.RetrieveAvailableLanguagesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveAvailableLanguages",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607489.aspx
	 * @description Retrieves all business units from the business unit hierarchy.
     * @alias RetrieveBusinessHierarchyBusinessUnitRequest
     */
    Requests.RetrieveBusinessHierarchyBusinessUnitRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveBusinessHierarchyBusinessUnit",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "businessunit",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607979.aspx
	 * @description Retrieves all resources that are related to the specified resource group
     * @alias RetrieveByGroupResourceRequest
     */
    Requests.RetrieveByGroupResourceRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveByGroupResource",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "resourcegroup",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607881.aspx
	 * @description Retrieves the resource groups (scheduling groups) that contain the specified resource.
     * @alias RetrieveByResourceResourceGroupRequest
     */
    Requests.RetrieveByResourceResourceGroupRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveByResourceResourceGroup",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "resource",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491172.aspx
	 * @description Retrieve the collection of services that are related to the specified set of resources.
     * @alias RetrieveByResourcesServiceRequest
     */
    Requests.RetrieveByResourcesServiceRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveByResourcesService",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607560.aspx
	 * @description Retrieves the top-ten articles about a specified product from the knowledge base of articles for the organization
     * @alias RetrieveByTopIncidentProductKbArticleRequest
     */
    Requests.RetrieveByTopIncidentProductKbArticleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveByTopIncidentProductKbArticle",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "product",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608058.aspx
	 * @description Retrieves the top-ten articles about a specified subject from the knowledge base of articles for your organization.
     * @alias RetrieveByTopIncidentSubjectKbArticleRequest
     */
    Requests.RetrieveByTopIncidentSubjectKbArticleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveByTopIncidentSubjectKbArticle",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "subject",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608120.aspx
	 * @description Retrieve information about the current organization.
     * @alias RetrieveCurrentOrganizationRequest
     */
    Requests.RetrieveCurrentOrganizationRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveCurrentOrganization",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608110.aspx
	 * @description Retrieves the data encryption key value.
     * @alias RetrieveDataEncryptionKeyRequest
     */
    Requests.RetrieveDataEncryptionKeyRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDataEncryptionKey",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607985.aspx
	 * @description Retrieves a collection of dependency records that describe any solution components that would prevent a solution component from being deleted.
     * @alias RetrieveDependenciesForDeleteRequest
     */
    Requests.RetrieveDependenciesForDeleteRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDependenciesForDelete",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607791.aspx
	 * @description Retrieves a list of the solution component dependencies that can prevent you from uninstalling a managed solution.
     * @alias RetrieveDependenciesForUninstallRequest
     */
    Requests.RetrieveDependenciesForUninstallRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDependenciesForUninstall",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593045.aspx
	 * @description Retrieves a list dependencies for solution components that directly depend on a solution component.
     * @alias RetrieveDependentComponentsRequest
     */
    Requests.RetrieveDependentComponentsRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDependentComponents",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593056.aspx
	 * @description Retrieves the type of license for a deployment of Microsoft Dynamics 365.
     * @alias RetrieveDeploymentLicenseTypeRequest
     */
    Requests.RetrieveDeploymentLicenseTypeRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDeploymentLicenseType",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607656.aspx
	 * @description Retrieves a list of language packs that are installed on the server that have been disabled.
     * @alias RetrieveDeprovisionedLanguagesRequest
     */
    Requests.RetrieveDeprovisionedLanguagesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDeprovisionedLanguages",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683537.aspx
	 * @description Detects and retrieves duplicates for a specified record.
     * @alias RetrieveDuplicatesRequest
     */
    Requests.RetrieveDuplicatesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDuplicates",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491170.aspx
	 * @description Retrieve the changes for an entity.
     * @alias RetrieveEntityChangesRequest
     */
    Requests.RetrieveEntityChangesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveEntityChanges",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607698.aspx
	 * @description Retrieves ribbon definitions for an entity.
     * @alias RetrieveEntityRibbonRequest
     */
    Requests.RetrieveEntityRibbonRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveEntityRibbon",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491173.aspx
	 * @description Retrieves the appointments for the current user for a specific date range from the exchange web service.
     * @alias RetrieveExchangeAppointmentsRequest
     */
    Requests.RetrieveExchangeAppointmentsRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveExchangeAppointments",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607795.aspx
	 * @description Retrieves the exchange rate.
     * @alias RetrieveExchangeRateRequest
     */
    Requests.RetrieveExchangeRateRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveExchangeRate",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491174.aspx
	 * @description Retrieves the entity forms that are available for a specified user.
     * @alias RetrieveFilteredFormsRequest
     */
    Requests.RetrieveFilteredFormsRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveFilteredForms",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607487.aspx
	 * @description Retrieves the formatted results from an import job.
     * @alias RetrieveFormattedImportJobResultsRequest
     */
    Requests.RetrieveFormattedImportJobResultsRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveFormattedImportJobResults",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607696.aspx
	 * @description Retrieves the list of language packs that are installed on the server.
     * @alias RetrieveInstalledLanguagePacksRequest
     */
    Requests.RetrieveInstalledLanguagePacksRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveInstalledLanguagePacks",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608102.aspx
	 * @description Retrieves the version of an installed language pack.
     * @alias RetrieveInstalledLanguagePackVersionRequest
     */
    Requests.RetrieveInstalledLanguagePackVersionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveInstalledLanguagePackVersion",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607844.aspx
	 * @description Retrieves the number of used and available licenses for a deployment of Microsoft Dynamics 365.
     * @alias RetrieveLicenseInfoRequest
     */
    Requests.RetrieveLicenseInfoRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveLicenseInfo",
            writeable: true
        }
    });

    /**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683538.aspx
     * @description Retrieves localized labels for a limited set of entity attributes.
     * @alias RetrieveLocLabelsRequest
     */
    Requests.RetrieveLocLabelsRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveLocLabels",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt592988.aspx
	 * @description Retrieves folder-level tracking rules for a mailbox.
     * @alias RetrieveMailboxTrackingFoldersRequest
     */
    Requests.RetrieveMailboxTrackingFoldersRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveMailboxTrackingFolders",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt622412.aspx
	 * @description Retrieves the members of a bulk operation.
     * @alias RetrieveMembersBulkOperationRequest
     */
    Requests.RetrieveMembersBulkOperationRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveMembersBulkOperation",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "bulkoperation",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607580.aspx
	 * @description Retrieves a list of missing components in the target organization.
     * @alias RetrieveMissingComponentsRequest
     */
    Requests.RetrieveMissingComponentsRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveMissingComponents",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607972.aspx
	 * @description Retrieves any required solution components that are not included in the solution.
     * @alias RetrieveMissingDependenciesRequest
     */
    Requests.RetrieveMissingDependenciesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveMissingDependencies",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607527.aspx
	 * @description Retrieves the resources that are used by an organization.
     * @alias RetrieveOrganizationResourcesRequest
     */
    Requests.RetrieveOrganizationResourcesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveOrganizationResources",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607818.aspx
	 * @description Retrieves the collection of the parent resource groups of the specified resource group (scheduling group).
     * @alias RetrieveParentGroupsResourceGroupRequest
     */
    Requests.RetrieveParentGroupsResourceGroupRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveParentGroupsResourceGroup",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607594.aspx
	 * @description Retrieves the data from the parse table.
     * @alias RetrieveParsedDataImportFileRequest
     */
    Requests.RetrieveParsedDataImportFileRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveParsedDataImportFile",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607613.aspx
	 * @description Retrieves pages of posts, including comments for each post, for all records that the calling user is following.
     * @alias RetrievePersonalWallRequest
     */
    Requests.RetrievePersonalWallRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrievePersonalWall",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683539.aspx
	 * @description Retrieves the access rights of the specified security principal (team or user) to the specified record.
     * @alias RetrievePrincipalAccessRequest
     */
    Requests.RetrievePrincipalAccessRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrievePrincipalAccess",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607755.aspx
	 * @description Retrieves all the secured attribute privileges a user or team has through direct or indirect (through team membership) associations with the FieldSecurityProfile entity.
     * @alias RetrievePrincipalAttributePrivilegesRequest
     */
    Requests.RetrievePrincipalAttributePrivilegesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrievePrincipalAttributePrivileges",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593098.aspx
	 * @description For internal use only.
     * @alias RetrievePrincipalSyncAttributeMappingsRequest
     */
    Requests.RetrievePrincipalSyncAttributeMappingsRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrievePrincipalSyncAttributeMappings",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt622426.aspx
	 * @description Retrieves the set of privileges defined in the system.
     * @alias RetrievePrivilegeSetRequest
     */
    Requests.RetrievePrivilegeSetRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrievePrivilegeSet",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491175.aspx
	 * @description TODO: RetrieveProcessInstances Function Description (By MS)
     * @alias RetrieveProcessInstancesRequest
     */
    Requests.RetrieveProcessInstancesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveProcessInstances",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607701.aspx
	 * @description Retrieve all the property instances (dynamic property instances) for a product added to an opportunity, quote, order, or invoice.
     * @alias RetrieveProductPropertiesRequest
     */
    Requests.RetrieveProductPropertiesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveProductProperties",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593074.aspx
	 * @description Retrieves the version of a provisioned language pack.
     * @alias RetrieveProvisionedLanguagePackVersionRequest
     */
    Requests.RetrieveProvisionedLanguagePackVersionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveProvisionedLanguagePackVersion",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607900.aspx
	 * @description Retrieves the list of provisioned languages.
     * @alias RetrieveProvisionedLanguagesRequest
     */
    Requests.RetrieveProvisionedLanguagesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveProvisionedLanguages",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683540.aspx
	 * @description Retrieves pages of posts, including comments for each post, for a specified record.
     * @alias RetrieveRecordWallRequest
     */
    Requests.RetrieveRecordWallRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveRecordWall",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607927.aspx
	 * @description Retrieves a collection of solution components that are required for a solution component.
     * @alias RetrieveRequiredComponentsRequest
     */
    Requests.RetrieveRequiredComponentsRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveRequiredComponents",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607997.aspx
	 * @description Retrieves the privileges that are assigned to the specified role.
     * @alias RetrieveRolePrivilegesRoleRequest
     */
    Requests.RetrieveRolePrivilegesRoleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveRolePrivilegesRole",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607604.aspx
	 * @description Retrieves the collection of child resource groups from the specified resource group.
     * @alias RetrieveSubGroupsResourceGroupRequest
     */
    Requests.RetrieveSubGroupsResourceGroupRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveSubGroupsResourceGroup",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "resourcegroup",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608036.aspx
	 * @description Retrieves the privileges for a team.
     * @alias RetrieveTeamPrivilegesRequest
     */
    Requests.RetrieveTeamPrivilegesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveTeamPrivileges",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "team",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607518.aspx
	 * @description Retrieves a time stamp for the metadata.
     * @alias RetrieveTimestampRequest
     */
    Requests.RetrieveTimestampRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveTimestamp",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683541.aspx
	 * @description Retrieves a collection of unpublished organization-owned records that satisfy the specified query criteria.
     * @alias RetrieveUnpublishedMultipleRequest
     */
    Requests.RetrieveUnpublishedMultipleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveUnpublishedMultiple",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607996.aspx
	 * @description Retrieves the privileges a system user (user) has through his or her roles in the specified business unit.
     * @alias RetrieveUserPrivilegesRequest
     */
    Requests.RetrieveUserPrivilegesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveUserPrivileges",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607579.aspx
	 * @description Retrieves all private queues of a specified user and optionally all public queues.
     * @alias RetrieveUserQueuesRequest
     */
    Requests.RetrieveUserQueuesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveUserQueues",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593041.aspx
	 * @description Retrieves the version number of the Microsoft Dynamics 365 Server.
     * @alias RetrieveVersionRequest
     */
    Requests.RetrieveVersionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveVersion",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491176.aspx
	 * @description Retrieves all the entity records that are related to the specified record.
     * @alias RollupRequest
     */
    Requests.RollupRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "Rollup",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608029.aspx
	 * @description Searches for available time slots that fulfill the specified appointment request.
     * @alias SearchRequest
     */
    Requests.SearchRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "Search",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683542.aspx
	 * @description Searches for knowledge base articles that contain the specified body text.
     * @alias SearchByBodyKbArticleRequest
     */
    Requests.SearchByBodyKbArticleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "SearchByBodyKbArticle",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683543.aspx
	 * @description Searches for knowledge base articles that contain the specified keywords.
     * @alias SearchByKeywordsKbArticleRequest
     */
    Requests.SearchByKeywordsKbArticleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "SearchByKeywordsKbArticle",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683544.aspx
	 * @description Searches for knowledge base articles that contain the specified title.
     * @alias SearchByTitleKbArticleRequest
     */
    Requests.SearchByTitleKbArticleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "SearchByTitleKbArticle",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt683545.aspx
	 * @description Validates a rule for a recurring appointment.
     * @alias ValidateRecurrenceRuleRequest
     */
    Requests.ValidateRecurrenceRuleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "ValidateRecurrenceRule",
            writeable: true
        }
    });

    /**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607925.aspx
     * @description Retrieves the system user ID for the currently logged on user or the user under whose context the code is running.
     * @alias WhoAmIRequest
     */
    Requests.WhoAmIRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "WhoAmI",
            writeable: true
        }
    });

     // Actions

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607569.aspx
	 * @description Adds an item to a campaign.
     * @alias AddItemCampaignRequest
     */
    Requests.AddItemCampaignRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddItemCampaign",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607559.aspx
	 * @description Adds an item to a campaign activity.
     * @alias AddItemCampaignActivityRequest
     */
    Requests.AddItemCampaignActivityRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddItemCampaignActivity",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607641.aspx
	 * @description Adds members to a list.
     * @alias AddListMembersListRequest
     */
    Requests.AddListMembersListRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddListMembersList",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607495.aspx
	 * @description Adds a member to a list (marketing list).
     * @alias AddMemberListRequest
     */
    Requests.AddMemberListRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddMemberList",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "list",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607496.aspx
	 * @description Adds members to a team.
     * @alias AddMembersTeamRequest
     */
    Requests.AddMembersTeamRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddMembersTeam",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "team",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593089.aspx
	 * @description Adds the specified principal to the list of queue members.
     * @alias AddPrincipalToQueueRequest
     */
    Requests.AddPrincipalToQueueRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddPrincipalToQueue",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "queue",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607862.aspx
	 * @description Adds a set of existing privileges to an existing role.
     * @alias AddPrivilegesRoleRequest
     */
    Requests.AddPrivilegesRoleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddPrivilegesRole",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "role",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607566.aspx
	 * @description Adds recurrence information to an existing appointment.
     * @alias AddRecurrenceRequest
     */
    Requests.AddRecurrenceRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddRecurrence",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "appointment",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593057.aspx
	 * @description Adds a solution component to an unmanaged solution.
     * @alias AddSolutionComponentRequest
     */
    Requests.AddSolutionComponentRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddSolutionComponent",
            writeable: true
        }
    });

    /**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607880.aspx
     * @description Moves an entity record from a source queue to a destination queue.
     * @alias AddToQueueRequest
     */
    Requests.AddToQueueRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddToQueue",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "queue",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607951.aspx
	 * @description Adds a user to the auto created access team for the specified record.
     * @alias AddUserToRecordTeamRequest
     */
    Requests.AddUserToRecordTeamRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddUserToRecordTeam",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608069.aspx
	 * @description Applies record creation and update rules to activities in 365 created as a result of the integration with external applications.
     * @alias ApplyRecordCreationAndUpdateRuleRequest
     */
    Requests.ApplyRecordCreationAndUpdateRuleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ApplyRecordCreationAndUpdateRule",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608125.aspx
	 * @description Applies the active routing rule to an incident.
     * @alias ApplyRoutingRuleRequest
     */
    Requests.ApplyRoutingRuleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ApplyRoutingRule",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607766.aspx
	 * @description Generates a new set of attribute mappings based on the metadata.
     * @alias AutoMapEntityRequest
     */
    Requests.AutoMapEntityRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AutoMapEntity",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt718079.aspx
	 * @description Schedules or "books" an appointment, recurring appointment, or service appointment (service activity).
     * @alias BookRequest
     */
    Requests.BookRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "Book",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491158.aspx
	 * @description Submits a bulk delete job that deletes selected records in bulk. This job runs asynchronously in the background without blocking other activities.
     * @alias BulkDeleteRequest
     */
    Requests.BulkDeleteRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "BulkDelete",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491162.aspx
	 * @description Submits an asynchronous system job that detects and logs multiple duplicate records.
     * @alias BulkDetectDuplicatesRequest
     */
    Requests.BulkDetectDuplicatesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "BulkDetectDuplicates",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607988.aspx
	 * @description Calculates the value of an opportunity that is in the "Won" state.
     * @alias CalculateActualValueOpportunityRequest
     */
    Requests.CalculateActualValueOpportunityRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CalculateActualValueOpportunity",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "opportunity",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608012.aspx
	 * @description Calculates price in an opportunity, quote, order, and invoice.
     * @alias CalculatePriceRequest
     */
    Requests.CalculatePriceRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CalculatePrice",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593059.aspx
	 * @description Checks whether the specified entity can be the primary entity (one) in a one-to-many relationship.
     * @alias CanBeReferencedRequest
     */
    Requests.CanBeReferencedRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CanBeReferenced",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607578.aspx
	 * @description Checkes whether an entity can be the referencing entity in a one-to-many relationship.
     * @alias CanBeReferencingRequest
     */
    Requests.CanBeReferencingRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CanBeReferencing",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607610.aspx
	 * @description Cancels a contract.
     * @alias CancelContractRequest
     */
    Requests.CancelContractRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CancelContract",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "contract",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607587.aspx
	 * @description Cancels a sales order.
     * @alias CancelSalesOrderRequest
     */
    Requests.CancelSalesOrderRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CancelSalesOrder",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607577.aspx
	 * @description Checks whether an entity can participate in a many-to-many relationship.
     * @alias CanManyToManyRequest
     */
    Requests.CanManyToManyRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CanManyToMany",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607802.aspx
	 * @description Creates a solution patch from a managed or unmanaged solution.
     * @alias CloneAsPatchRequest
     */
    Requests.CloneAsPatchRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloneAsPatch",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607806.aspx
	 * @description Creates a new copy of an unmanged solution that contains the original solution plus all of its patches.
     * @alias CloneAsSolutionRequest
     */
    Requests.CloneAsSolutionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloneAsSolution",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607895.aspx
	 * @description Copies an existing contract and its line items.
     * @alias CloneContractRequest
     */
    Requests.CloneContractRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloneContract",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "contract",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt718080.aspx
	 * @description For internal use only.
     * @alias CloneMobileOfflineProfileRequest
     */
    Requests.CloneMobileOfflineProfileRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloneMobileOfflineProfile",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "mobileofflineprofile",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608030.aspx
	 * @description Copies an existing product family, product, or bundle under the same parent record.
     * @alias CloneProductRequest
     */
    Requests.CloneProductRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloneProduct",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "product",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607498.aspx
	 * @description Closes an incident (case).
     * @alias CloseIncidentRequest
     */
    Requests.CloseIncidentRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloseIncident",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607685.aspx
	 * @description Closes a quote.
     * @alias CloseQuoteRequest
     */
    Requests.CloseQuoteRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloseQuote",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608088.aspx
	 * @description Updates a duplicate rule (duplicate detection rule) and its related duplicate rule conditions.
     * @alias CompoundUpdateDuplicateDetectionRuleRequest
     */
    Requests.CompoundUpdateDuplicateDetectionRuleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CompoundUpdateDuplicateDetectionRule",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607749.aspx
	 * @description Converts a team of type owner to a team of type access.
     * @alias ConvertOwnerTeamToAccessTeamRequest
     */
    Requests.ConvertOwnerTeamToAccessTeamRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ConvertOwnerTeamToAccessTeam",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "team",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607933.aspx
	 * @description Converts a product to a kit.
     * @alias ConvertProductToKitRequest
     */
    Requests.ConvertProductToKitRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ConvertProductToKit",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607842.aspx
	 * @description Converts a quote to a sales order.
     * @alias ConvertQuoteToSalesOrderRequest
     */
    Requests.ConvertQuoteToSalesOrderRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ConvertQuoteToSalesOrder",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607736.aspx
	 * @description Converts a sales order to an invoice.
     * @alias ConvertSalesOrderToInvoiceRequest
     */
    Requests.ConvertSalesOrderToInvoiceRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ConvertSalesOrderToInvoice",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607820.aspx
	 * @description Copies a campaign.
     * @alias CopyCampaignRequest
     */
    Requests.CopyCampaignRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CopyCampaign",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "campaign",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607655.aspx
	 * @description Creates a copy of a campaign response
     * @alias CopyCampaignResponseRequest
     */
    Requests.CopyCampaignResponseRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CopyCampaignResponse",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "campaignresponse",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593064.aspx
	 * @description Creates a static list from the specified dynamic list and add the members that satisfy the dynamic list query criteria to the static list.
     * @alias CopyDynamicListToStaticRequest
     */
    Requests.CopyDynamicListToStaticRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CopyDynamicListToStatic",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "list",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607620.aspx
	 * @description Copies the members from the source list to the target list without creating duplicates.
     * @alias CopyMembersListRequest
     */
    Requests.CopyMembersListRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CopyMembersList",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "list",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608044.aspx
	 * @description Creates a new entity form that is based on an existing entity form.
     * @alias CopySystemFormRequest
     */
    Requests.CopySystemFormRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CopySystemForm",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemform",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607931.aspx
	 * @description Creates a quick campaign to distribute an activity to members of a list (marketing list).
     * @alias CreateActivitiesListRequest
     */
    Requests.CreateActivitiesListRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateActivitiesList",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491161.aspx
	 * @description Creates a new customer lookup attribute, and optionally, to add it to a specified unmanaged solution.
     * @alias CreateCustomerRelationshipsRequest
     */
    Requests.CreateCustomerRelationshipsRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateCustomerRelationships",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593100.aspx
	 * @description Creates an exception for the recurring appointment instance.
     * @alias CreateExceptionRequest
     */
    Requests.CreateExceptionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateException",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608070.aspx
	 * @description Creates future unexpanded instances for the recurring appointment master.
     * @alias CreateInstanceRequest
     */
    Requests.CreateInstanceRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateInstance",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607622.aspx
	 * @description Creates translation of a knowledge article instance.
     * @alias CreateKnowledgeArticleTranslationRequest
     */
    Requests.CreateKnowledgeArticleTranslationRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateKnowledgeArticleTranslation",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607825.aspx
	 * @description Creates a major or minor version of a knowledge article instance.
     * @alias CreateKnowledgeArticleVersionRequest
     */
    Requests.CreateKnowledgeArticleVersionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateKnowledgeArticleVersion",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt622404.aspx
	 * @description Creates a workflow (process) from a workflow template.
     * @alias CreateWorkflowFromTemplateRequest
     */
    Requests.CreateWorkflowFromTemplateRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateWorkflowFromTemplate",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "workflow",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607488.aspx
	 * @description Replaces managed solution (A) plus all of its patches with managed solution (B) that is the clone of (A) and all of its patches.
     * @alias DeleteAndPromoteRequest
     */
    Requests.DeleteAndPromoteRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeleteAndPromote",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607758.aspx
	 * @description Deletes all audit data records up until a specified end date.
     * @alias DeleteAuditDataRequest
     */
    Requests.DeleteAuditDataRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeleteAuditData",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608051.aspx
	 * @description Deletes instances of a recurring appointment master that have an “Open” state.
     * @alias DeleteOpenInstancesRequest
     */
    Requests.DeleteOpenInstancesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeleteOpenInstances",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607754.aspx
	 * @description Deletes an option value in a global or local option set.
     * @alias DeleteOptionValueRequest
     */
    Requests.DeleteOptionValueRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeleteOptionValue",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607515.aspx
	 * @description Creates an email activity record from an incoming email message.
     * @alias DeliverIncomingEmailRequest
     */
    Requests.DeliverIncomingEmailRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeliverIncomingEmail",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608033.aspx
	 * @description Creates an email activity record from the specified email message
     * @alias DeliverPromoteEmailRequest
     */
    Requests.DeliverPromoteEmailRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeliverPromoteEmail",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "email",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608078.aspx
	 * @description Deprovisions a language.
     * @alias DeprovisionLanguageRequest
     */
    Requests.DeprovisionLanguageRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeprovisionLanguage",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607926.aspx
	 * @description Creates a bulk operation that distributes a campaign activity.
     * @alias DistributeCampaignActivityRequest
     */
    Requests.DistributeCampaignActivityRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DistributeCampaignActivity",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "campaignactivity",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491159.aspx
	 * @description Executes a workflow.
     * @alias ExecuteWorkflowRequest
     */
    Requests.ExecuteWorkflowRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ExecuteWorkflow",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "workflow",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt622402.aspx
	 * @description Exports a data map as an XML formatted data.
     * @alias ExportMappingsImportMapRequest
     */
    Requests.ExportMappingsImportMapRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ExportMappingsImportMap",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "importmap",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607590.aspx
	 * @description Exports a solution.
     * @alias ExportSolutionRequest
     */
    Requests.ExportSolutionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ExportSolution",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608097.aspx
	 * @description Exports all translations for a specific solution to a compressed file.
     * @alias ExportTranslationRequest
     */
    Requests.ExportTranslationRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ExportTranslation",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607784.aspx
	 * @description Fulfills a sales order.
     * @alias FulfillSalesOrderRequest
     */
    Requests.FulfillSalesOrderRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "FulfillSalesOrder",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

    /**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491160.aspx
	 * @description Performs a full-text search on knowledge articles in Dynamics 365 using the specified search text.
     * @alias FullTextSearchKnowledgeArticleRequest
     */
    Requests.FullTextSearchKnowledgeArticleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "FullTextSearchKnowledgeArticle",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593066.aspx
	 * @description Generates an invoice from an opportunity.
     * @alias GenerateInvoiceFromOpportunityRequest
     */
    Requests.GenerateInvoiceFromOpportunityRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GenerateInvoiceFromOpportunity",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607591.aspx
	 * @description Generates a quote from an opportunity.
     * @alias GenerateQuoteFromOpportunityRequest
     */
    Requests.GenerateQuoteFromOpportunityRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GenerateQuoteFromOpportunity",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607659.aspx
	 * @description Generates a sales order (order) from an opportunity.
     * @alias GenerateSalesOrderFromOpportunityRequest
     */
    Requests.GenerateSalesOrderFromOpportunityRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GenerateSalesOrderFromOpportunity",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593014.aspx
	 * @description Returns an existing social profile record if one exists, otherwise generates a new one and returns it.
     * @alias GenerateSocialProfileRequest
     */
    Requests.GenerateSocialProfileRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GenerateSocialProfile",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "socialprofile",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607526.aspx
	 * @description Retrieves the products from an opportunity and copy them to the invoice.
     * @alias GetInvoiceProductsFromOpportunityRequest
     */
    Requests.GetInvoiceProductsFromOpportunityRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GetInvoiceProductsFromOpportunity",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "invoice",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607548.aspx
	 * @description Retrieves the products from an opportunity and copy them to the quote.
     * @alias GetQuoteProductsFromOpportunityRequest
     */
    Requests.GetQuoteProductsFromOpportunityRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GetQuoteProductsFromOpportunity",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "quote",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607869.aspx
	 * @description Retrieves the products from an opportunity and copy them to the sales order.
     * @alias GetSalesOrderProductsFromOpportunityRequest
     */
    Requests.GetSalesOrderProductsFromOpportunityRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GetSalesOrderProductsFromOpportunity",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "salesorder",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593007.aspx
	 * @description Returns a tracking token that can then be passed as a parameter to the SendEmailRequest message.
     * @alias GetTrackingTokenEmailRequest
     */
    Requests.GetTrackingTokenEmailRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GetTrackingTokenEmail",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608013.aspx
	 * @description Imports translations from a compressed file.
     * @alias ImportFieldTranslationRequest
     */
    Requests.ImportFieldTranslationRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ImportFieldTranslation",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607768.aspx
	 * @description Imports the XML representation of a data map and create an import map (data map) based on this data.
     * @alias ImportMappingsImportMapRequest
     */
    Requests.ImportMappingsImportMapRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ImportMappingsImportMap",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt622418.aspx
	 * @description Submits an asynchronous job that uploads the transformed data into Microsoft Dynamics 365.
     * @alias ImportRecordsImportRequest
     */
    Requests.ImportRecordsImportRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ImportRecordsImport",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "import",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608117.aspx
	 * @description Imports a solution.
     * @alias ImportSolutionRequest
     */
    Requests.ImportSolutionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ImportSolution",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607744.aspx
	 * @description Imports translations from a compressed file.
     * @alias ImportTranslationRequest
     */
    Requests.ImportTranslationRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ImportTranslation",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607647.aspx
	 * @description Inserts a new option value for a global or local option set.
     * @alias InsertOptionValueRequest
     */
    Requests.InsertOptionValueRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "InsertOptionValue",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607839.aspx
	 * @description Inserts a new option into a StatusAttributeMetadata attribute.
     * @alias InsertStatusValueRequest
     */
    Requests.InsertStatusValueRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "InsertStatusValue",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608101.aspx
	 * @description Installs the sample data.
     * @alias InstallSampleDataRequest
     */
    Requests.InstallSampleDataRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "InstallSampleData",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607877.aspx
	 * @description Instantiates a set of filters for Dynamics 365 for Outlook for the specified user.
     * @alias InstantiateFiltersRequest
     */
    Requests.InstantiateFiltersRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "InstantiateFilters",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt592993.aspx
	 * @description Creates an email message from a template (email template).
     * @alias InstantiateTemplateRequest
     */
    Requests.InstantiateTemplateRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "InstantiateTemplate",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607781.aspx
	 * @description Locks the total price of products and services that are specified in the invoice.
     * @alias LockInvoicePricingRequest
     */
    Requests.LockInvoicePricingRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "LockInvoicePricing",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "invoice",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607804.aspx
	 * @description Locks the total price of products and services that are specified in the sales order (order).
     * @alias LockSalesOrderPricingRequest
     */
    Requests.LockSalesOrderPricingRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "LockSalesOrderPricing",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "salesorder",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607618.aspx
	 * @description Sets the state of an opportunity to Lost.
     * @alias LoseOpportunityRequest
     */
    Requests.LoseOpportunityRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "LoseOpportunity",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607669.aspx
	 * @description Merges the information from two entity records of the same type.
     * @alias MergeRequest
     */
    Requests.MergeRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "Merge",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607483.aspx
	 * @description Sets the order for an option set.
     * @alias OrderOptionRequest
     */
    Requests.OrderOptionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "OrderOption",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt622440.aspx
	 * @description Submits an asynchronous job that parses all import files that are associated with the specified import (data import).
     * @alias ParseImportRequest
     */
    Requests.ParseImportRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ParseImport",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "import",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593071.aspx
	 * @description Assigns a queue item to a user and optionally remove the queue item from the queue.
     * @alias PickFromQueueRequest
     */
    Requests.PickFromQueueRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PickFromQueue",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "queueitem",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607787.aspx
	 * @description Processes the email responses from a marketing campaign.
     * @alias ProcessInboundEmailRequest
     */
    Requests.ProcessInboundEmailRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ProcessInboundEmail",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "email",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491163.aspx
	 * @description Creates a quick campaign to distribute an activity to accounts, contacts, or leads that are selected by a query.
     * @alias PropagateByExpressionRequest
     */
    Requests.PropagateByExpressionRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PropagateByExpression",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608077.aspx
	 * @description Provisions a new language.
     * @alias ProvisionLanguageRequest
     */
    Requests.ProvisionLanguageRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ProvisionLanguage",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607699.aspx
	 * @description Publishes all changes to solution components.
     * @alias PublishAllXmlRequest
     */
    Requests.PublishAllXmlRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PublishAllXml",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt622423.aspx
	 * @description Submits an asynchronous job to publish a duplicate rule.
     * @alias PublishDuplicateRuleRequest
     */
    Requests.PublishDuplicateRuleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PublishDuplicateRule",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "duplicaterule",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593011.aspx
	 * @description Publishes a product family record and all its child records.
     * @alias PublishProductHierarchyRequest
     */
    Requests.PublishProductHierarchyRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PublishProductHierarchy",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "product",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608018.aspx
	 * @description Publishes a theme and set it as the current theme.
     * @alias PublishThemeRequest
     */
    Requests.PublishThemeRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PublishTheme",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "theme",
            writeable: true
        }
    });

    /**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593076.aspx
     * @description Publishes specified solution components.
     * @alias PublishXmlRequest
     */
    Requests.PublishXmlRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PublishXml",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491164.aspx
	 * @description Qualifies a lead and create account, contact, and opportunity records that are linked to the originating lead record.
     * @alias QualifyLeadRequest
     */
    Requests.QualifyLeadRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "QualifyLead",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "lead",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607614.aspx
	 * @description Qualifies the specified list and either override the list members or remove them according to the specified option.
     * @alias QualifyMemberListRequest
     */
    Requests.QualifyMemberListRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "QualifyMemberList",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "list",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491165.aspx
	 * @description Converts a QueryExpression query to its equivalent FetchXML query
     * @alias QueryExpressionToFetchXmlRequest
     */
    Requests.QueryExpressionToFetchXmlRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "QueryExpressionToFetchXml",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607627.aspx
	 * @description Reassigns all records that are owned by the security principal (user or team) to another security principal (user or team).
     * @alias ReassignObjectsOwnerRequest
     */
    Requests.ReassignObjectsOwnerRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ReassignObjectsOwner",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607965.aspx
	 * @description Reassigns all records that are owned by a specified user to another security principal (user or team).
     * @alias ReassignObjectsSystemUserRequest
     */
    Requests.ReassignObjectsSystemUserRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ReassignObjectsSystemUser",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607675.aspx
	 * @description Recalculate system-computed values for rollup fields in the goal hierarchy.
     * @alias RecalculateRequest
     */
    Requests.RecalculateRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "Recalculate",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "goal",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593031.aspx
	 * @description Assigns a queue item back to the queue owner so others can pick it.
     * @alias ReleaseToQueueRequest
     */
    Requests.ReleaseToQueueRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ReleaseToQueue",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "queueitem",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607534.aspx
	 * @description Removes a queue item from a queue.
     * @alias RemoveFromQueueRequest
     */
    Requests.RemoveFromQueueRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RemoveFromQueue",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "queueitem",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607537.aspx
	 * @description Removes members from a team.
     * @alias RemoveMembersTeamRequest
     */
    Requests.RemoveMembersTeamRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RemoveMembersTeam",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607528.aspx
	 * @description Removes the parent for a system user (user) record.
     * @alias RemoveParentRequest
     */
    Requests.RemoveParentRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RemoveParent",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593107.aspx
	 * @description Removes a privilege from an existing role.
     * @alias RemovePrivilegeRoleRequest
     */
    Requests.RemovePrivilegeRoleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RemovePrivilegeRole",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "role",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608116.aspx
	 * @description Removes a component from an unmanaged solution.
     * @alias RemoveSolutionComponentRequest
     */
    Requests.RemoveSolutionComponentRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RemoveSolutionComponent",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607735.aspx
	 * @description Removes a user from the auto created access team for the specified record.
     * @alias RemoveUserFromRecordTeamRequest
     */
    Requests.RemoveUserFromRecordTeamRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RemoveUserFromRecordTeam",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593084.aspx
	 * @description Renews a contract and create the contract details for a new contract.
     * @alias RenewContractRequest
     */
    Requests.RenewContractRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RenewContract",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "contract",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607893.aspx
	 * @description Renews an entitlement.
     * @alias RenewEntitlementRequest
     */
    Requests.RenewEntitlementRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RenewEntitlement",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "entitlement",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607752.aspx
	 * @description Replaces the privilege set of an existing role.
     * @alias ReplacePrivilegesRoleRequest
     */
    Requests.ReplacePrivilegesRoleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ReplacePrivilegesRole",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "role",
            writeable: true
        }
    });

    /**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt718082.aspx
	 * @description Reschedules an appointment, recurring appointment, or service appointment (service activity).
     * @alias RescheduleRequest
     */
    Requests.RescheduleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "Reschedule",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607633.aspx
	 * @description Resets the offline data filters for the calling user to the default filters for the organization.
     * @alias ResetUserFiltersRequest
     */
    Requests.ResetUserFiltersRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ResetUserFilters",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608006.aspx
	 * @description Reverts changes done to properties of a product family, product, or bundle record, and set it back to its last published (active) state.
     * @alias RevertProductRequest
     */
    Requests.RevertProductRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RevertProduct",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607543.aspx
	 * @description Sets the state of a quote to Draft.
     * @alias ReviseQuoteRequest
     */
    Requests.ReviseQuoteRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ReviseQuote",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607505.aspx
	 * @description Replaces the access rights on the target record for the specified security principal (user or team).
     * @alias RevokeAccessRequest
     */
    Requests.RevokeAccessRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RevokeAccess",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607729.aspx
	 * @description Routes a queue item to a queue, a user, or a team.
     * @alias RouteToRequest
     */
    Requests.RouteToRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RouteTo",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491166.aspx
	 * @description Sends bulk email messages.
     * @alias SendBulkMailRequest
     */
    Requests.SendBulkMailRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SendBulkMail",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608061.aspx
	 * @description Sends an e-mail message.
     * @alias SendEmailRequest
     */
    Requests.SendEmailRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SendEmail",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "email",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607523.aspx
	 * @description Sends an e-mail message to a recipient using an e-mail template.
     * @alias SendEmailFromTemplateRequest
     */
    Requests.SendEmailFromTemplateRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SendEmailFromTemplate",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607670.aspx
	 * @description Sends a fax.
     * @alias SendFaxRequest
     */
    Requests.SendFaxRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SendFax",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607717.aspx
	 * @description Sends a bulk email message that is created from a template.
     * @alias SendTemplateRequest
     */
    Requests.SendTemplateRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SendTemplate",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608087.aspx
	 * @description Assigns equipment (facility/equipment) to a specific business unit.
     * @alias SetBusinessEquipmentRequest
     */
    Requests.SetBusinessEquipmentRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetBusinessEquipment",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593023.aspx
	 * @description Moves a system user (user) to a different business unit.
     * @alias SetBusinessSystemUserRequest
     */
    Requests.SetBusinessSystemUserRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetBusinessSystemUser",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608039.aspx
	 * @description Sets or restore the data encryption key.
     * @alias SetDataEncryptionKeyRequest
     */
    Requests.SetDataEncryptionKeyRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetDataEncryptionKey",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491167.aspx
	 * @description TODO: SetFeatureStatus Action Description (Obviously no description yet)
     * @alias SetFeatureStatusRequest
     */
    Requests.SetFeatureStatusRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetFeatureStatus",
            writeable: true
        }
    });

    /**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607609.aspx
     * @description Sets localized labels for a limited set of entity attributes.
     * @alias SetLocLabelsRequest
     */
    Requests.SetLocLabelsRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetLocLabels",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607617.aspx
	 * @description Sets a new parent system user (user) for the specified user.
     * @alias SetParentSystemUserRequest
     */
    Requests.SetParentSystemUserRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetParentSystemUser",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607705.aspx
	 * @description Sets the process that associates with a given target entity. The user can set to another business process or specify null to clear out the current process.
     * @alias SetProcessRequest
     */
    Requests.SetProcessRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetProcess",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607765.aspx
	 * @description Links an instance of a report entity to related entities.
     * @alias SetReportRelatedRequest
     */
    Requests.SetReportRelatedRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetReportRelated",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608027.aspx
	 * @description Submits an asynchronous job that transforms the parsed data.
     * @alias TransformImportRequest
     */
    Requests.TransformImportRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "TransformImport",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt622443.aspx
	 * @description Validates the configuration of a Microsoft Azure Service Bus solution’s service endpoint.
     * @alias TriggerServiceEndpointCheckRequest
     */
    Requests.TriggerServiceEndpointCheckRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "TriggerServiceEndpointCheck",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "serviceendpoint",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608045.aspx
	 * @description Uninstalls the sample data.
     * @alias UninstallSampleDataRequest
     */
    Requests.UninstallSampleDataRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UninstallSampleData",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608015.aspx
	 * @description Unlocks pricing for an invoice.
     * @alias UnlockInvoicePricingRequest
     */
    Requests.UnlockInvoicePricingRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UnlockInvoicePricing",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt608026.aspx
	 * @description Unlocks pricing for a sales order (order).
     * @alias UnlockSalesOrderPricingRequest
     */
    Requests.UnlockSalesOrderPricingRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UnlockSalesOrderPricing",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt593018.aspx
	 * @description Submits an asynchronous job to unpublish a duplicate rule.
     * @alias UnpublishDuplicateRuleRequest
     */
    Requests.UnpublishDuplicateRuleRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UnpublishDuplicateRule",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt491168.aspx
	 * @description TODO: UpdateFeatureConfig Action Description (Missing)
     * @alias UpdateFeatureConfigRequest
     */
    Requests.UpdateFeatureConfigRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UpdateFeatureConfig",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607949.aspx
	 * @description Updates an option value in a global or local option set.
     * @alias UpdateOptionValueRequest
     */
    Requests.UpdateOptionValueRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UpdateOptionValue",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607561.aspx
	 * @description Updates values of the property instances (dynamic property instances) for a product added to an opportunity, quote, order, or invoice.
     * @alias UpdateProductPropertiesRequest
     */
    Requests.UpdateProductPropertiesRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UpdateProductProperties",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607611.aspx
	 * @description Updates a component in an unmanaged solution.
     * @alias UpdateSolutionComponentRequest
     */
    Requests.UpdateSolutionComponentRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UpdateSolutionComponent",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607556.aspx
	 * @description Updates an option set value in for a StateAttributeMetadata attribute.
     * @alias UpdateStateValueRequest
     */
    Requests.UpdateStateValueRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UpdateStateValue",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607767.aspx
	 * @description Verifies that an appointment or service appointment (service activity) has valid available resources for the activity, duration, and site, as appropriate.
     * @alias ValidateRequest
     */
    Requests.ValidateRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "Validate",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607945.aspx
	 * @description Validates a saved query.
     * @alias ValidateSavedQueryRequest
     */
    Requests.ValidateSavedQueryRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ValidateSavedQuery",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607971.aspx
	 * @description Sets the state of an opportunity to Won.
     * @alias WinOpportunityRequest
     */
    Requests.WinOpportunityRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "WinOpportunity",
            writeable: true
        }
    });

	/**
     * @memberof module:Requests
     * @this {Requests}
     * @see https://msdn.microsoft.com/en-us/library/mt607710.aspx
	 * @description Sets the state of a quote to Won.
     * @alias WinQuoteRequest
     */
    Requests.WinQuoteRequest = Object.create(Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "WinQuote",
            writeable: true
        }
    });

    // Export Requests for later referencing in Core
    module.exports = Requests;
} ());
